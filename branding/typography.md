# 🔤 ARTRON: Typography System

ტიპოგრაფია ასახავს სისტემის გეომეტრიულ სიმკაცრესა და ფუნქციონალურ ხასიათს.

---

##  Fonts (შრიფტები)

### 1. Primary (სათაურები და ინტერფეისი)
* **ინგლისური:** `Outfit`
* **ქართული:** `FiraGO` (Bold/Medium)
* **გამოყენება:** სათაურები, ნავიგაციის ტექსტები, ღილაკები და ძირითადი კითხვითი ბლოკები. Outfit-ის გეომეტრიული სიმკაცრე ქმნის სუფთა, ინდუსტრიულ იერსახეს.

### 2. Technical (მონაცემები და სისტემური ტერმინები)
* **შრიფტი:** `JetBrains Mono`
* **გამოყენება:** მეტაინფორმაცია, ციფრები, სტატისტიკური მაჩვენებლები, იარლიყები (labels) და ტექნიკური სტატუსები.

---

## 📐 Font Scale & Weights (იერარქია)

| ზომა | კლასი (Tailwind) | შრიფტი | წონა (Weight) | დანიშნულება |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | `text-4xl` (36px) | Outfit / FiraGO | Bold (700) | ეკრანის მთავარი სათაურები |
| **H2** | `text-2xl` (24px) | Outfit / FiraGO | SemiBold (600) | სექციის სათაურები |
| **Body** | `text-base` (16px) | Outfit / FiraGO | Light (300) / Regular (400) | ძირითადი აღწერები |
| **Meta** | `text-xs` (12px) | JetBrains Mono | Regular (400) / Medium (500) | სისტემური იარლიყები, სტატისტიკა |

---

## 🌍 Google Fonts Import Link

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 🛠️ Tailwind Configuration

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'FiraGO', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  }
}
```
