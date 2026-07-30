# 🛡️ ARTRON: 9-Node Core Logo

ARTRON-ის ლოგო წარმოადგენს გეომეტრიულ 9-კვანძოვან ქსელს (3x3), რომლის ცენტრშიც არის მწვანე ინფორმაციული ბირთვი (Emerald Core).

---

## 📐 გეომეტრიული სტრუქტურა
* **ტილო:** 64x64 პიქსელი.
* **შიდა სამუშაო არე:** 48x48 პიქსელი (8px padding ყველა მხრიდან).
* **კვანძების მდებარეობა:** x, y კოორდინატები ∈ `{8, 32, 56}`.
* **დამაკავშირებელი ხაზები:** 12 ხაზი (3 ჰორიზონტალური, 3 ვერტიკალური, 2 დიაგონალი ცენტრში).
* **ცენტრალური ბირთვი:** Emerald Core (რადიუსი 4.4, ფერი `#00E676`).

---

## 💾 SVG კოდი (SVG Code)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Artron OS Logo">
  <!-- Connectors (Antique Silver) -->
  <g stroke="#9CA3AF" stroke-width="1.1" stroke-linecap="round" fill="none">
    <!-- Horizontal -->
    <line x1="8"  y1="8"  x2="56" y2="8"  />
    <line x1="8"  y1="32" x2="56" y2="32" />
    <line x1="8"  y1="56" x2="56" y2="56" />
    <!-- Vertical -->
    <line x1="8"  y1="8"  x2="8"  y2="56" />
    <line x1="32" y1="8"  x2="32" y2="56" />
    <line x1="56" y1="8"  x2="56" y2="56" />
    <!-- Diagonals -->
    <line x1="8"  y1="8"  x2="56" y2="56" />
    <line x1="56" y1="8"  x2="8"  y2="56" />
  </g>
  
  <!-- 8 Outer Nodes (Antique Silver) -->
  <g fill="#9CA3AF">
    <circle cx="8"  cy="8"  r="2.4" />
    <circle cx="32" cy="8"  r="2.4" />
    <circle cx="56" cy="8"  r="2.4" />
    <circle cx="8"  cy="32" r="2.4" />
    <circle cx="56" cy="32" r="2.4" />
    <circle cx="8"  cy="56" r="2.4" />
    <circle cx="32" cy="56" r="2.4" />
    <circle cx="56" cy="56" r="2.4" />
  </g>
  
  <!-- Central Emerald Core -->
  <circle cx="32" cy="32" r="4.4" fill="#00E676" />
</svg>
```
