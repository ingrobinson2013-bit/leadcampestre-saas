"""
Entrenamiento QLoRA de Valentina Ríos (Proyecto La Estrella - LeadCampestre OS)
Maestría en Inteligencia Artificial — Reducción de 85% de tokens en System Prompt.
"""

from unsloth import FastLanguageModel
import torch
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import load_dataset

max_seq_length = 2048

# 1. Cargar modelo base Qwen-2.5-7B-Instruct cuantizado a 4 bits
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Qwen2.5-7B-Instruct-bnb-4bit",
    max_seq_length=max_seq_length,
    load_in_4bit=True,
)

# 2. Configurar adaptadores PEFT / LoRA
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=[
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj",
    ],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
)

# 3. Cargar el dataset oficial de Valentina Ríos (Proyecto La Estrella)
dataset = load_dataset(
    "json",
    data_files="dataset_valentina_la_estrella.jsonl",
    split="train",
)

def formatting_prompts_func(examples):
    convos = examples["messages"]
    texts = [
        tokenizer.apply_chat_template(
            convo,
            tokenize=False,
            add_generation_prompt=False,
        )
        for convo in convos
    ]
    return {"text": texts}

dataset = dataset.map(formatting_prompts_func, batched=True)

# 4. Ejecutar Fine-Tuning Supervisado (SFT)
trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=max_seq_length,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=10,
        max_steps=120,
        learning_rate=2e-4,
        fp16=not torch.cuda.is_bf16_supported(),
        bf16=torch.cuda.is_bf16_supported(),
        logging_steps=10,
        output_dir="outputs_valentina_la_estrella",
    ),
)

if __name__ == "__main__":
    trainer.train()
    model.save_pretrained_merged(
        "valentina_la_estrella_qlora_v1",
        tokenizer,
        save_method="merged_16bit",
    )
