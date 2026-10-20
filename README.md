# Super SAT

Andijon Yuksalish maktabi o'quvchilari uchun SAT tayyorlov sayti (Teacher Azizbek): lug'atlar (4 kitob), SAT Writing (4 mavzu), SAT Reading (13 mavzu), mavzular, Full Mock Practice (Bluebook formati) va SAT Game.

Butun sayt bitta statik fayl — `index.html`. Server yoki build kerak emas.

## Ishga tushirish

Faylni brauzerda oching yoki lokal server bilan:

```bash
npx serve .
```

## Vercel

- Framework Preset: **Other**
- Build Command: bo'sh (yo'q)
- Output Directory: `.` (loyiha ildizi)
- Sozlamalar `vercel.json` da: kesh, xavfsizlik sarlavhalari, har qanday yo'l `index.html` ga yo'naltiriladi.

`main` branchga har bir push avtomatik yangi deploy qiladi.

## claude.ai'dan tashqarida

Sinflar (taklif kodlari) va "O'qituvchi sifatida kirish" claude.ai artifact muhitiga bog'liq. Vercel'da bu tugmalar yashiriladi, ulashish havolalari esa saytning o'z manziliga (`location.origin`) ishora qiladi. Natijalarni yuborish va "Guruh reytingi" (natija qatorlarini joylash) odatdagidek ishlaydi.
