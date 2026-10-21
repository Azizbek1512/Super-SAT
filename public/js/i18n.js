/* Super SAT — interface language (uz / ru / en).
   The app renders its screens in Uzbek, exactly as the original. This layer translates the interface
   text (buttons, headings, hints, messages) in place after each render. Learning content — passages,
   questions, word lists, explanations and lessons — is never altered. */
(function(){
"use strict";
const LANGS=["uz","ru","en"];
const KEY="ss-lang";

/* ---------- exact strings: [uz, ru, en] ---------- */
const D=[
// app shell
["Bosh sahifa","Главная","Home"],
["Lug'atlar","Словари","Vocabulary"],
["Writing","Writing","Writing"],
["Reading","Reading","Reading"],
["Mavzular","Темы","Themes"],
["Mock imtihon","Пробный экзамен","Mock exam"],
["O'yinlar","Игры","Games"],
["Menyu","Меню","Menu"],
["Til","Язык","Language"],
["Yorug' rejim","Светлая тема","Light mode"],
["Qorong'i rejim","Тёмная тема","Dark mode"],
["Tepaga","Наверх","Back to top"],
["Klaviatura: A–D yoki 1–4 — variant, Enter — tasdiqlash / keyingi.","Клавиатура: A–D или 1–4 — вариант, Enter — подтвердить / далее.","Keyboard: A–D or 1–4 — choose, Enter — confirm / next."],
["Andijon Yuksalish maktabi o'quvchilari uchun","Для учеников школы «Yuksalish» (Андижан)","For students of Yuksalish school, Andijan"],
["Imtihonni tark etasizmi? Natijalar saqlanmaydi.","Покинуть экзамен? Результаты не сохранятся.","Leave the exam? Your results will not be saved."],
["Davom etish","Продолжить","Continue"],
["Chiqish","Выйти","Exit"],

// gate & teacher login
["Kirish uchun parolni kiriting.","Введите пароль, чтобы войти.","Enter the password to sign in."],
["Parol","Пароль","Password"],
["Kirish","Войти","Sign in"],
["Parol noto'g'ri. Qayta urinib ko'ring.","Неверный пароль. Попробуйте ещё раз.","Wrong password. Please try again."],
["O'qituvchi paroli","Пароль учителя","Teacher password"],
["O'qituvchi sifatida kirish","Войти как учитель","Sign in as teacher"],
["O'qituvchi rejimidan chiqish","Выйти из режима учителя","Leave teacher mode"],
["Tekshirilmoqda...","Проверка...","Checking..."],
["Tekshirib bo'lmadi, birozdan keyin qayta urinib ko'ring.","Не удалось проверить, попробуйте чуть позже.","Could not check, please try again shortly."],
["Server bilan aloqa yo'q. Birozdan keyin qayta urinib ko'ring.","Нет связи с сервером. Попробуйте чуть позже.","No connection to the server. Please try again shortly."],

// home
["Bu loyiha Andijon Yuksalish maktabi o'quvchilari uchun","Этот проект специально для учеников андижанской школы «Yuksalish» подготовил","This project was specially made for the students of Andijan Yuksalish school by"],
["tomonidan maxsus tayyorlandi.",".","."],
["Kitobni tanlang","Выберите раздел","Choose a section"],
["Kitobni tanlang.","Выберите книгу.","Choose a book."],
["Lug'atlar bilan ishlash","Работа со словами","Vocabulary practice"],
["4 ta mavzu","4 темы","4 topics"],
["13 ta mavzu","13 тем","13 topics"],
["Qiziqarli o'yinlar","Интересные игры","Fun games"],
["Themes","Темы","Themes"],
["Mavzular bo'yicha","По темам","By topic"],
["Bluebook formatidagi imtihon: Mock English, Mock Math, Full Mock","Экзамен в формате Bluebook: Mock English, Mock Math, Full Mock","Bluebook-style exam: Mock English, Mock Math, Full Mock"],
["O'qituvchi uchun: guruh reytingi","Для учителя: рейтинг группы","For teachers: group ranking"],
["Sinflarni boshqarish","Управление классами","Manage classes"],
["Hozircha imtihon belgilanmagan.","Экзамен пока не назначен.","No exam assigned yet."],
["Imtihonni boshlash","Начать экзамен","Start exam"],
["Sinfdan chiqish","Выйти из класса","Leave class"],
["Sinfga qo'shilish","Присоединиться к классу","Join a class"],
["Taklif kodi","Код приглашения","Invite code"],
["Qo'shilish","Присоединиться","Join"],
["Kod topilmadi. Tekshirib, qayta kiriting.","Код не найден. Проверьте и введите снова.","Code not found. Check it and try again."],

// common
["Orqaga","Назад","Back"],
["Keyinroq →","Позже →","Later →"],
["Ortga","Назад","Back"],
["Keyingi","Далее","Next"],
["Keyingisi","Следующий","Next"],
["Boshlash","Начать","Start"],
["Ketma-ket","По порядку","In order"],
["Aralash (random)","Вперемешку (random)","Shuffled (random)"],
["Mavzuni tanlang.","Выберите тему.","Choose a topic."],
["Bo'limni tanlang.","Выберите раздел.","Choose a section."],
["Tez orada","Скоро","Coming soon"],
["Mavzular tez orada shu yerga qo'shiladi.","Темы скоро появятся здесь.","Topics will be added here soon."],
["Hammasi","Все","All"],
["Xatolar","Ошибки","Mistakes"],
["Javobsiz","Без ответа","Unanswered"],
["Yopish ✕","Закрыть ✕","Close ✕"],
["Natijani ko'rish","Посмотреть результат","See results"],
["Telegramda yuborish","Отправить в Telegram","Send via Telegram"],
["Nusxalandi!","Скопировано!","Copied!"],
["Nusxalab bo'lmadi, kodni qo'lda yozib bering","Не удалось скопировать, перепишите код вручную","Could not copy, please type the code manually"],
["Xato","Ошибки","Wrong"],
["Talaffuzni eshitish","Прослушать произношение","Listen to pronunciation"],
["Bu brauzer ovozni qo'llab-quvvatlamaydi","Этот браузер не поддерживает озвучку","This browser does not support speech"],
["Grafik yoki jadval","График или таблица","Chart or table"],

// vocabulary
["Mashq qilmoqchi bo'lgan setni tanlang.","Выберите сет для практики.","Choose a set to practise."],
["Juft setlar","Парные сеты","Paired sets"],
["Alohida setlar","Отдельные сеты","Single sets"],
["Kitoblarga qaytish","Назад к книгам","Back to books"],
["Testni boshlash","Начать тест","Start test"],
["Lug'atlar ro'yxati","Список слов","Word list"],
["So'zlar va tarjimalarini yodlash uchun ko'ring","Слова и переводы для запоминания","Words and translations to memorise"],
["So'zga mos ta'rifni topish testi","Тест: найдите определение к слову","Test: match each word to its definition"],
["Setdagi so'zlar bo'yicha 10 tadan test (SAT Writing kabi)","По 10 тестов на слова сета (как в SAT Writing)","10 questions per set on its words (SAT Writing style)"],
["Setdagi so'zlar ishtirokidagi matn va uning tarjimasi","Текст со словами сета и его перевод","A passage using the set's words, with translation"],
["Word, Definition, Example, Antonym (kitobdagidek)","Word, Definition, Example, Antonym (как в книге)","Word, Definition, Example, Antonym (as in the book)"],
["Tarjimani ko'rsatish","Показать перевод","Show translation"],
["Tarjimani yashirish (o'zingizni sinang)","Скрыть перевод (проверьте себя)","Hide translation (test yourself)"],
["So'z, ta'rif, misol va antonim. Manba: Vocabook (@satashkent).","Слово, определение, пример и антоним. Источник: Vocabook (@satashkent).","Word, definition, example and antonym. Source: Vocabook (@satashkent)."],
["Setdagi so'zlar matn ichida ajratib ko'rsatilgan. Manba: Vocabook (@satashkent). Pastda o'zbekcha tarjimasi.","Слова сета выделены в тексте. Источник: Vocabook (@satashkent). Ниже перевод на узбекский.","The set's words are highlighted in the text. Source: Vocabook (@satashkent). Uzbek translation below."],
["Raqamlar qaysi so'zlarga tegishli","Какие слова обозначают цифры","Which words the numbers refer to"],
["Tarjima tez orada qo'shiladi.","Перевод скоро будет добавлен.","Translation coming soon."],
["Kitobdagi Fight Time testlari. Har bir set — 10 ta test. Bo'limni tanlang va tartibini belgilang.","Тесты Fight Time из книги. В каждом сете — 10 тестов. Выберите раздел и порядок.","Fight Time tests from the book. Each set has 10 questions. Choose a section and the order."],
["Barcha setlar","Все сеты","All sets"],

// writing / reading tests
["Bo'limni tanlang va tartibini belgilang: ketma-ket (kitobdagi tartib) yoki aralash (random).","Выберите раздел и порядок: по порядку (как в книге) или вперемешку (random).","Choose a section and the order: in order (as in the book) or shuffled (random)."],
["Boshlanish №","Начало №","From №"],
["Tugash №","Конец №","To №"],

// before start / timer
["Boshlashdan oldin","Перед началом","Before you start"],
["Taymer","Таймер","Timer"],
["Taymersiz","Без таймера","No timer"],
["Sekundomer","Секундомер","Stopwatch"],
["Vaqt faqat o'lchanadi","Время только измеряется","Time is only measured"],
["Soniyani o'zingiz kiritasiz","Секунды задаёте сами","You set the seconds"],
["Soniya","Секунды","Seconds"],
["Vaqt ichida javob bera olmasangiz, savol avtomatik yopiladi va keyingi savolga o'tiladi.","Если не успеете ответить, вопрос закроется автоматически и откроется следующий.","If you do not answer in time, the question closes and the next one opens."],
["Soniyani 3 dan 3600 gacha kiriting.","Введите от 3 до 3600 секунд.","Enter between 3 and 3600 seconds."],

// quiz
["← Boshiga qaytish","← На главную","← Home"],
["☰ Savollar","☰ Вопросы","☰ Questions"],
["Qaysi savolga javob berilgan, qaysisiga yo'q","На какие вопросы есть ответ, на какие нет","Which questions are answered and which are not"],
["Javobni tanlang, kerak bo'lsa boshqasiga almashtiring.","Выберите ответ, при необходимости поменяйте.","Choose an answer; you can change it."],
["Qaysi ta'rif shu so'zga mos? Javobni tanlang, kerak bo'lsa boshqasiga almashtiring.","Какое определение подходит к слову? Выберите ответ, при необходимости поменяйте.","Which definition fits this word? Choose an answer; you can change it."],
["Ma'nosi qaysi? Javobni tanlang, kerak bo'lsa boshqasiga almashtiring.","Какое значение верно? Выберите ответ, при необходимости поменяйте.","What does it mean? Choose an answer; you can change it."],
["Javobni tasdiqlash","Подтвердить ответ","Confirm answer"],
["Set oynasiga qaytish","Вернуться к сету","Back to the set"],
["Keyinroq yechaman — bu savol oxirida qayta so'raladi","Решу позже — вопрос повторится в конце","Do it later — this question comes back at the end"],
["To'g'ri!","Верно!","Correct!"],
["Noto'g'ri. To'g'ri javob yashil rangda.","Неверно. Правильный ответ выделен зелёным.","Incorrect. The correct answer is in green."],
["Vaqt tugadi. To'g'ri javob yashil rangda.","Время вышло. Правильный ответ выделен зелёным.","Time is up. The correct answer is in green."],
["Keyingi savolga o'tilmoqda...","Переход к следующему вопросу...","Moving to the next question..."],
["Izohni ko'rishni istaysizmi?","Показать объяснение?","Show the explanation?"],
["Javob berilmadi (vaqt tugadi)","Нет ответа (время вышло)","No answer (time ran out)"],
["To'g'ri:","Верно:","Correct:"],
["· Xato:","· Ошибки:","· Wrong:"],
["Savollar ro'yxati","Список вопросов","Question list"],
["Javob berilgan:","Отвечено:","Answered:"],
["· Javobsiz:","· Без ответа:","· Unanswered:"],
[". Javobsiz savol raqamini bossangiz, shu savolga o'tasiz.",". Нажмите номер вопроса без ответа, чтобы перейти к нему.",". Tap an unanswered number to jump to it."],
["✓ to'g'ri · ✗ xato · bo'sh katak — javob berilmagan · qalin ramka — hozirgi savol","✓ верно · ✗ ошибка · пустая клетка — без ответа · жирная рамка — текущий вопрос","✓ correct · ✗ wrong · empty — unanswered · thick border — current question"],
// annotation tools
["Sariq marker","Жёлтый маркер","Yellow highlighter"],
["Yashil marker","Зелёный маркер","Green highlighter"],
["Pushti marker","Розовый маркер","Pink highlighter"],
["Tagiga chiziq","Подчеркнуть","Underline"],
["Qalam","Карандаш","Pen"],
["O'chirgich","Ластик","Eraser"],
["Oxirgi chiziqni bekor qilish","Отменить последнюю линию","Undo last stroke"],
["Hammasini tozalash","Очистить всё","Clear all"],

// explanations (labels only)
["Izoh","Объяснение","Explanation"],
["Matn:","Текст:","Text:"],
["Tarjima:","Перевод:","Translation:"],
["Eslatmalar va vazifa (tarjima):","Заметки и задание (перевод):","Notes and task (translation):"],
["To'g'ri javob:","Правильный ответ:","Correct answer:"],
["Nima uchun:","Почему:","Why:"],
["Tahlil:","Разбор:","Analysis:"],
["Tekshiruv:","Проверка:","Check:"],
["Savol tarjimasi:","Перевод вопроса:","Question translation:"],
["Matn tarjimasi:","Перевод текста:","Text translation:"],
["Bu test uchun izoh hali qo'shilmagan.","Объяснение к этому тесту ещё не добавлено.","No explanation has been added for this question yet."],
["Bu savol uchun izoh hali qo'shilmagan.","Объяснение к этому вопросу ещё не добавлено.","No explanation has been added for this question yet."],
["Yechim","Решение","Solution"],

// results
["To'g'ri","Верно","Correct"],
["A'lo natija!","Отличный результат!","Excellent!"],
["Yaxshi. Xatolarni takrorlang.","Хорошо. Повторите ошибки.","Good. Review your mistakes."],
["Yana mashq qiling, albatta chiqadi.","Потренируйтесь ещё — всё получится.","Keep practising — you will get there."],
["Sarflangan vaqt:","Затрачено времени:","Time spent:"],
["Urinishlar","Попытки","Attempts"],
["Noto'g'ri javoblar ro'yxati","Список неверных ответов","Wrong answers"],
["Sizning javobingiz:","Ваш ответ:","Your answer:"],
["Hamma so'z to'g'ri topildi.","Все слова отгаданы верно.","All words answered correctly."],
["Boshqa set tanlash","Выбрать другой сет","Choose another set"],
["Natijani o'qituvchiga yuborish","Отправить результат учителю","Send your result to the teacher"],
["Ism va familiyangiz","Имя и фамилия","Your full name"],
["Natijani nusxalash","Копировать результат","Copy result"],
["Matnni qo'lda belgilab nusxalang","Выделите текст и скопируйте вручную","Select the text and copy it manually"],

// teacher ranking
["Guruh reytingi","Рейтинг группы","Group ranking"],
["O'quvchilar yuborgan natija qatorlarini (har qatorda bittadan) shu yerga joylang. Har bir o'quvchining eng yaxshi urinishi hisobga olinadi.","Вставьте сюда строки результатов от учеников (по одной в строке). Учитывается лучшая попытка каждого ученика.","Paste the result lines students sent you (one per line). Each student's best attempt counts."],
["Barcha sinflar","Все классы","All classes"],
["Reytingni hisoblash","Рассчитать рейтинг","Calculate ranking"],
["O'rin","Место","Rank"],
["Ism","Имя","Name"],
["Sinf","Класс","Class"],
["Topdi","Верно","Score"],
["Foiz","Процент","Percent"],
["Urinish","Попытки","Attempts"],
["Qatnashganlar:","Участники:","Participants:"],
["ta. Guruhning o'rtacha natijasi:",". Средний результат группы:",". Group average:"],

// manage classes
["Sinflar","Классы","Classes"],
["Sinf qo'shing, o'quvchilarga taklif kodini yuboring va imtihon setlarini belgilang. O'zgarishlar \"Saqlash va e'lon qilish\" bosilgandan keyingina o'quvchilarga ko'rinadi.","Добавьте класс, отправьте ученикам код приглашения и выберите сеты для экзамена. Ученики увидят изменения только после нажатия «Сохранить и опубликовать».","Add a class, send students the invite code and choose the exam sets. Students see changes only after you press \"Save and publish\"."],
["Saqlanmagan o'zgarishlar bor. Pastdagi \"Saqlash va e'lon qilish\" tugmasini bosing.","Есть несохранённые изменения. Нажмите «Сохранить и опубликовать» ниже.","You have unsaved changes. Press \"Save and publish\" below."],
["Yangi sinf nomi, masalan: 9-A","Название нового класса, например: 9-A","New class name, e.g. 9-A"],
["Sinf qo'shish","Добавить класс","Add class"],
["Taklif kodi:","Код приглашения:","Invite code:"],
["Taklif matnini nusxalash","Скопировать приглашение","Copy invitation"],
["Yangi kod yaratish","Создать новый код","Generate new code"],
["Imtihon uchun setlar:","Сеты для экзамена:","Exam sets:"],
["Sinfni o'chirish","Удалить класс","Delete class"],
["Saqlash va e'lon qilish","Сохранить и опубликовать","Save and publish"],
["Saqlanmoqda...","Сохранение...","Saving..."],
["Saqlandi. O'quvchilar endi yangi sozlamalarni ko'radi.","Сохранено. Ученики теперь видят новые настройки.","Saved. Students now see the new settings."],
["Saqlash faqat o'qituvchi rejimida ishlaydi.","Сохранение доступно только в режиме учителя.","Saving works only in teacher mode."],

// themes menus
["SAT English bilan tanishuv","Знакомство с SAT English","Introduction to SAT English"],
["Bog'lovchi so'zlar","Слова-связки","Linking words"],
["Student notes savollari","Вопросы Student notes","Student notes questions"],
["So'z turkumlari","Части речи","Parts of speech"],
["Tinish belgilari","Знаки препинания","Punctuation marks"],
["Gaplar va fragmentlar","Предложения и фрагменты","Sentences and fragments"],
["Gaplarni bog'lash va ajratish","Соединение и разделение предложений","Joining and separating sentences"],
["Muhim va muhim bo'lmagan clause lar","Существенные и несущественные clause","Essential and non-essential clauses"],
["Vergul qoidalari va xatolari","Правила и ошибки с запятой","Comma rules and mistakes"],
["Ega va kesim moslashuvi","Согласование подлежащего и сказуемого","Subject–verb agreement"],
["Olmoshlar","Местоимения","Pronouns"],
["Apostrof","Апостроф","Apostrophe"],
["Aniqlovchilar","Определения (модификаторы)","Modifiers"],
["Parallel tuzilish","Параллельная структура","Parallel structure"],
["Prefix, suffix va ildizlar (Words in Context)","Префиксы, суффиксы и корни (Words in Context)","Prefixes, suffixes and roots (Words in Context)"],
["Qo'shimcha ma'lumotlar","Дополнительные материалы","Extra notes"],

// games
["O'ynab o'rganing! Rekordingizni yangilang.","Учитесь играя! Побейте свой рекорд.","Learn by playing! Beat your record."],
["Tezkor lug'at","Быстрый словарь","Speed vocabulary"],
["Xotira kartalari","Карточки на память","Memory cards"],
["3 jon: Grammatika","3 жизни: Грамматика","3 lives: Grammar"],
["Qaysi tarjima to'g'ri?","Какой перевод верный?","Which translation is correct?"],
["Ball:","Баллы:","Score:"],
["Ketma-ket:","Серия:","Streak:"],
["Yurishlar:","Ходы:","Moves:"],
["Juftlar:","Пары:","Pairs:"],
["Vaqt tugadi!","Время вышло!","Time is up!"],
["Barakalla!","Молодец!","Well done!"],
["O'yin tugadi","Игра окончена","Game over"],
["Yangi rekord!","Новый рекорд!","New record!"],
["Qayta o'ynash","Играть снова","Play again"],
["O'yinlar menyusi","Меню игр","Games menu"],
["Xato:","Ошибки:","Wrong:"],
["Eng uzun ketma-ketlik:","Самая длинная серия:","Longest streak:"],
["To'g'ri javoblar:","Верных ответов:","Correct answers:"],
["Vaqt:","Время:","Time:"],
["soniya","сек","seconds"],

// mock
["Digital SAT (Bluebook) formatidagi to'liq mashq: modullar, rasmiy vaqt, savollar ro'yxati, belgilash va yakuniy ball bahosi. Ikkinchi modul birinchi modul natijasiga qarab osonroq yoki qiyinroq tanlanadi.","Полная практика в формате Digital SAT (Bluebook): модули, официальное время, список вопросов, отметки и итоговая оценка балла. Второй модуль легче или сложнее — в зависимости от результата первого.","A full Digital SAT (Bluebook) style practice: modules, official timing, question list, flags and a final score estimate. Module 2 is easier or harder depending on how you did in Module 1."],
["Reading and Writing · 2 modul · 54 savol · 64 daqiqa","Reading and Writing · 2 модуля · 54 вопроса · 64 минуты","Reading and Writing · 2 modules · 54 questions · 64 minutes"],
["2 modul · 44 savol · 70 daqiqa","2 модуля · 44 вопроса · 70 минут","2 modules · 44 questions · 70 minutes"],
["English + Math · 98 savol · 134 daqiqa + 10 daqiqa tanaffus","English + Math · 98 вопросов · 134 минуты + 10 минут перерыв","English + Math · 98 questions · 134 minutes + 10-minute break"],
["2 modul, har birida 27 savol, har modulga 32 daqiqa","2 модуля, в каждом 27 вопросов, 32 минуты на модуль","2 modules, 27 questions each, 32 minutes per module"],
["Tanaffus:","Перерыв:","Break:"],
["10 daqiqa (xohlasangiz o'tkazib yuborishingiz mumkin)","10 минут (можно пропустить)","10 minutes (you can skip it)"],
["2 modul, har birida 22 savol, har modulga 35 daqiqa. Savollarning bir qismi javobni o'zingiz yozadigan (student-produced response) turda; kalkulyator va formulalar ro'yxati mavjud","2 модуля, в каждом 22 вопроса, 35 минут на модуль. Часть вопросов — с вводом своего ответа (student-produced response); есть калькулятор и список формул","2 modules, 22 questions each, 35 minutes per module. Some questions ask you to type your own answer (student-produced response); a calculator and formula sheet are available"],
["Har modulda savollar orasida erkin yurasiz, javobni o'zgartirasiz va savolni belgilab qo'yasiz","В каждом модуле можно свободно переходить между вопросами, менять ответ и отмечать вопрос","Within a module you can move freely between questions, change answers and flag questions"],
["Modul tugagach javoblar ko'rsatilmaydi va oldingi modulga qaytib bo'lmaydi. Natija va izohlar imtihon oxirida chiqadi","После модуля ответы не показываются, и вернуться к прошлому модулю нельзя. Результат и объяснения — в конце экзамена","Answers are not shown after a module and you cannot go back to it. Results and explanations appear at the end"],
["2-modul 1-modul natijasiga qarab osonroq yoki qiyinroq bo'ladi","Модуль 2 легче или сложнее — в зависимости от результата модуля 1","Module 2 is easier or harder depending on your Module 1 result"],
["Vaqtsiz rejim (faqat mashq uchun, taymersiz)","Режим без времени (только для практики, без таймера)","Untimed mode (practice only, no timer)"],
["Tayyor bo'lsangiz boshlang. Boshlangach taymer ishga tushadi.","Начинайте, когда будете готовы. Таймер запустится сразу.","Start when you are ready. The timer starts right away."],
["Modulni boshlash","Начать модуль","Start module"],
["Imtihondan chiqish","Выйти из экзамена","Leave exam"],
["Ko'rsatish","Показать","Show"],
["Yashirish","Скрыть","Hide"],
["Formulalar","Формулы","Formulas"],
["Belgilangan","Отмечен","Flagged"],
["Keyinroq ko'rish uchun belgilash","Отметить, чтобы вернуться позже","Flag for review"],
["Javobingizni yozing (butun son, kasr 3/4 yoki o'nlik 0.75):","Введите ответ (целое число, дробь 3/4 или десятичная 0.75):","Type your answer (integer, fraction 3/4 or decimal 0.75):"],
["Variantni chiqarib tashlash","Вычеркнуть вариант","Cross out option"],
["Chiqarib tashlash","Вычеркнуть","Cross out"],
["Ko'rib chiqish","Обзор","Review"],
["Javob berilmagan:","Без ответа:","Unanswered:"],
[". Raqamni bossangiz, shu savolga o'tasiz.",". Нажмите номер, чтобы перейти к вопросу.",". Tap a number to go to that question."],
["To'liq rang — javob berilgan · kontur — javobsiz · qalin ramka — hozirgi savol ·","Заливка — есть ответ · контур — без ответа · жирная рамка — текущий вопрос ·","Filled — answered · outline — unanswered · thick border — current question ·"],
["— belgilangan","— отмечен","— flagged"],
["Ko'rib chiqish va topshirish","Обзор и сдача","Review and submit"],
["· Belgilangan:","· Отмечено:","· Flagged:"],
[". Savol raqamini bossangiz, unga qaytasiz.",". Нажмите номер вопроса, чтобы вернуться к нему.",". Tap a question number to go back to it."],
["Modulni topshirish","Сдать модуль","Submit module"],
["Savollarga qaytish","Вернуться к вопросам","Back to questions"],
["Ha, topshirish","Да, сдать","Yes, submit"],
["Yo'q, qaytish","Нет, вернуться","No, go back"],
["Modulni topshirasizmi?","Сдать модуль?","Submit this module?"],
["Modulni topshirasizmi? Topshirgandan keyin bu modulga qaytib bo'lmaydi.","Сдать модуль? После сдачи вернуться к нему нельзя.","Submit this module? You cannot return to it afterwards."],
["ta savolga javob berilmagan. Topshirgandan keyin bu modulga qaytib bo'lmaydi.","вопросов без ответа. После сдачи вернуться к модулю нельзя.","questions unanswered. You cannot return to this module afterwards."],
["Modul topshirildi","Модуль сдан","Module submitted"],
["Natija imtihon oxirida ko'rsatiladi.","Результат будет показан в конце экзамена.","Your result will be shown at the end of the exam."],
["Vaqt tugadi, javoblaringiz avtomatik topshirildi. Natija imtihon oxirida ko'rsatiladi.","Время вышло, ответы сданы автоматически. Результат будет показан в конце экзамена.","Time is up; your answers were submitted automatically. Your result will be shown at the end of the exam."],
["Tanaffusga o'tish","Перейти к перерыву","Go to break"],
["Math bo'limiga o'tish","Перейти к разделу Math","Go to the Math section"],
["Keyingi modul","Следующий модуль","Next module"],
["Tanaffus","Перерыв","Break"],
["Reading and Writing bo'limi tugadi. Dam oling, tayyor bo'lsangiz Math bo'limini boshlang.","Раздел Reading and Writing завершён. Отдохните и начните Math, когда будете готовы.","Reading and Writing is done. Take a rest and start Math when you are ready."],
["Tanaffusni tugatish","Закончить перерыв","End break"],
["Natija","Результат","Results"],
["Ball taxminiy hisob-kitob (rasmiy SAT shkalasi emas), faqat o'zingizni baholash uchun.","Балл — приблизительная оценка (не официальная шкала SAT), только для самопроверки.","The score is an estimate (not the official SAT scale), for self-assessment only."],
["Umumiy ball","Общий балл","Total score"],
["Modullar","Модули","Modules"],
["Javoblar va izohlarni ko'rish","Ответы и объяснения","Answers and explanations"],
["Qaytadan boshlash","Начать заново","Start again"],
["Javoblar va izohlar","Ответы и объяснения","Answers and explanations"],
["javob berilmagan","нет ответа","not answered"],
["· To'g'ri javob:","· Правильный ответ:","· Correct answer:"],
["Natijaga qaytish","Вернуться к результату","Back to results"],
["Kalkulyator","Калькулятор","Calculator"],
["Daraja","Градусы","Degrees"],
["Radian","Радианы","Radians"],
["Haqiqiy imtihonda Desmos kalkulyatori beriladi.","На настоящем экзамене даётся калькулятор Desmos.","The real exam provides the Desmos calculator."],
["Formulalar ro'yxati","Список формул","Formula sheet"],
["Doira: A = πr², C = 2πr","Круг: A = πr², C = 2πr","Circle: A = πr², C = 2πr"],
["To'g'ri to'rtburchak: A = ℓw","Прямоугольник: A = ℓw","Rectangle: A = ℓw"],
["Uchburchak: A = ½bh","Треугольник: A = ½bh","Triangle: A = ½bh"],
["Pifagor teoremasi: c² = a² + b²","Теорема Пифагора: c² = a² + b²","Pythagorean theorem: c² = a² + b²"],
["30°-60°-90° uchburchak tomonlari: x, x√3, 2x","Стороны треугольника 30°-60°-90°: x, x√3, 2x","30°-60°-90° triangle sides: x, x√3, 2x"],
["45°-45°-90° uchburchak tomonlari: s, s, s√2","Стороны треугольника 45°-45°-90°: s, s, s√2","45°-45°-90° triangle sides: s, s, s√2"],
["To'g'ri prizma: V = ℓwh","Прямая призма: V = ℓwh","Rectangular prism: V = ℓwh"],
["Silindr: V = πr²h","Цилиндр: V = πr²h","Cylinder: V = πr²h"],
["Shar: V = (4/3)πr³","Шар: V = (4/3)πr³","Sphere: V = (4/3)πr³"],
["Konus: V = (1/3)πr²h","Конус: V = (1/3)πr²h","Cone: V = (1/3)πr²h"],
["Piramida: V = (1/3)ℓwh","Пирамида: V = (1/3)ℓwh","Pyramid: V = (1/3)ℓwh"],
["Doira ichidagi burchak: markaziy burchak 360° (2π radian)","Углы окружности: центральный угол 360° (2π радиан)","Angles in a circle: a full central angle is 360° (2π radians)"],
["Uchburchak ichki burchaklari yig'indisi 180°","Сумма внутренних углов треугольника 180°","The interior angles of a triangle add up to 180°"],
];

/* ---------- patterns: [regex, ru(m,t), en(m,t)] — t() translates a captured piece ---------- */
const lb=(s,lang)=>lang==="uz"?s:s.replace(/barcha setlar/g,lang==="ru"?"все сеты":"all sets").replace(/ \((\d+) ta(, random)?\)/,(x,n,r)=>` (${n}${r||""})`);
const P=[
[/^(\d+) ta set, (\d+) ta so'z$/, m=>`${m[1]} сетов, ${m[2]} слов`, m=>`${m[1]} sets, ${m[2]} words`],
[/^(\d+) ta savol, (\d+) bo'lim$/, m=>`${m[1]} вопросов, разделов: ${m[2]}`, m=>`${m[1]} questions, ${m[2]} sections`],
[/^(\d+) ta test, (\d+) bo'lim$/, m=>`${m[1]} тестов, разделов: ${m[2]}`, m=>`${m[1]} questions, ${m[2]} sections`],
[/^(\d+) ta so'z$/, m=>`${m[1]} слов`, m=>`${m[1]} words`],
[/^(\d+) ta so'z\.$/, m=>`${m[1]} слов.`, m=>`${m[1]} words.`],
[/^(\d+) ta so'z\. Tarjimani ko'rish uchun qatorni bosing\.$/, m=>`${m[1]} слов. Нажмите на строку, чтобы увидеть перевод.`, m=>`${m[1]} words. Tap a row to see the translation.`],
[/^(\d+) ta (test|savol)$/, m=>`${m[1]} ${m[2]==="test"?"тестов":"вопросов"}`, m=>`${m[1]} questions`],
[/^(\d+) va (\d+)-setlar$/, m=>`Сеты ${m[1]} и ${m[2]}`, m=>`Sets ${m[1]} and ${m[2]}`],
[/^Barcha (\d+) set$/, m=>`Все ${m[1]} сетов`, m=>`All ${m[1]} sets`],
[/^(.+) · (\d+) ta so'z$/, m=>`${m[1]} · ${m[2]} слов`, m=>`${m[1]} · ${m[2]} words`],
[/^Set (\d+) · (\d+) ta so'z$/, m=>`Set ${m[1]} · ${m[2]} слов`, m=>`Set ${m[1]} · ${m[2]} words`],
[/^(.+): lug'atlar$/, (m,_,L)=>`${lb(m[1],"ru")}: слова`, (m,_,L)=>`${lb(m[1],"en")}: words`],
[/^(Vocabook|Reading Time|Fight Time) · (.+)$/, m=>`${m[1]} · ${lb(m[2],"ru")}`, m=>`${m[1]} · ${lb(m[2],"en")}`],
[/^(\S+) barcha setlar$/, m=>`${m[1]} все сеты`, m=>`${m[1]} all sets`],
[/^Tarjimasi · (.+)$/, m=>`Перевод · ${m[1]}`, m=>`Translation · ${m[1]}`],
[/^Savollar (\d+-\d+)$/, m=>`Вопросы ${m[1]}`, m=>`Questions ${m[1]}`],
[/^Qaysi (test|savol)dan qaysi \1gacha va nechta \1 yechishni o'zingiz kiriting \((\d+)–(\d+)\)\.$/, m=>`Укажите, с какого по какой ${m[1]==="test"?"тест":"вопрос"} и сколько решать (${m[2]}–${m[3]}).`, m=>`Enter the first and last question number and how many to solve (${m[2]}–${m[3]}).`],
[/^Nechta (test|savol) yechmoqchisiz\?$/, m=>`Сколько ${m[1]==="test"?"тестов":"вопросов"} решить?`, m=>`How many questions do you want to solve?`],
[/^Boshlanish va tugash raqamini (\d+) dan (\d+) gacha, to'g'ri tartibda kiriting\.$/, m=>`Введите начальный и конечный номер от ${m[1]} до ${m[2]} в правильном порядке.`, m=>`Enter start and end numbers between ${m[1]} and ${m[2]}, in order.`],
[/^Soni 1 dan (\d+) gacha bo'lishi kerak\.$/, m=>`Количество должно быть от 1 до ${m[1]}.`, m=>`The number must be between 1 and ${m[1]}.`],
[/^Sinf: (.+)$/, m=>`Класс: ${m[1]}`, m=>`Class: ${m[1]}`],
[/^Imtihon: (.+) \((\d+) ta so'z\)$/, m=>`Экзамен: ${m[1]} (${m[2]} слов)`, m=>`Exam: ${m[1]} (${m[2]} words)`],
[/^(.+) · (\d+) ta savol$/, m=>`${lb(m[1],"ru")} · ${m[2]} вопросов`, m=>`${lb(m[1],"en")} · ${m[2]} questions`],
[/^Har bir savolga necha soniya\?(?: \(kitob tavsiyasi: o'rtacha (.+)\))?$/, m=>`Сколько секунд на вопрос?${m[1]?` (рекомендация книги: в среднем ${m[1]})`:""}`, m=>`How many seconds per question?${m[1]?` (book recommendation: about ${m[1]} on average)`:""}`],
[/^(\d+) \/ (\d+) \((Test|Savol) №(\d+)\)$/, m=>`${m[1]} / ${m[2]} (${m[3]==="Test"?"Тест":"Вопрос"} №${m[4]})`, m=>`${m[1]} / ${m[2]} (${m[3]==="Test"?"Test":"Question"} №${m[4]})`],
[/^(.+) Keyingi savolga o'tilmoqda\.\.\.$/, (m,t)=>`${t(m[1])} Переход к следующему вопросу...`, (m,t)=>`${t(m[1])} Moving to the next question...`],
[/^Tahlil rejimi: (yoqilgan|o'chiq)$/, m=>`Режим анализа: ${m[1]==="yoqilgan"?"включён":"выключен"}`, m=>`Annotation mode: ${m[1]==="yoqilgan"?"on":"off"}`],
[/^(\d+)-urinish natijasi$/, m=>`Результат попытки ${m[1]}`, m=>`Attempt ${m[1]} result`],
[/^Natija \((\d+) ta\)$/, m=>`Результат (${m[1]})`, m=>`Score (${m[1]})`],
[/^· o'rtacha savolga (\d+) s$/, m=>`· в среднем ${m[1]} с на вопрос`, m=>`· ${m[1]} s per question on average`],
[/^(\d+)-urinish( \(xatolar qayta mashqi\))?$/, m=>`Попытка ${m[1]}${m[2]?" (повтор ошибок)":""}`, m=>`Attempt ${m[1]}${m[2]?" (mistakes retry)":""}`],
[/^(\d+\/\d+) to'g'ri,$/, m=>`${m[1]} верно,`, m=>`${m[1]} correct,`],
[/^, vaqt (.+)$/, m=>`, время ${m[1]}`, m=>`, time ${m[1]}`],
[/^Setdagi (\d+) ta so'zdan (\d+) tasi \((\d+)%\) o'zlashtirildi\.$/, m=>`Из ${m[1]} слов сета усвоено ${m[2]} (${m[3]}%).`, m=>`${m[2]} of the set's ${m[1]} words (${m[3]}%) learned.`],
[/^(\d+)-savol \((Test|Savol) №(\d+)\)$/, m=>`Вопрос ${m[1]} (${m[2]==="Test"?"Тест":"Вопрос"} №${m[3]})`, m=>`Question ${m[1]} (${m[2]==="Test"?"Test":"Question"} №${m[3]})`],
[/^(\d+)-savol: (.+)$/, m=>`Вопрос ${m[1]}: ${m[2]}`, m=>`Question ${m[1]}: ${m[2]}`],
[/^Xatolarni qayta mashq qilish \((\d+) ta\)$/, m=>`Повторить ошибки (${m[1]})`, m=>`Practise mistakes again (${m[1]})`],
[/^\.( O'qib bo'lmagan qatorlar: (\d+)\.)?$/, m=>`.${m[1]?` Не удалось прочитать строк: ${m[2]}.`:""}`, m=>`.${m[1]?` Unreadable lines: ${m[2]}.`:""}`],
[/^Natijalar topilmadi\.( O'qib bo'lmagan qatorlar: (\d+))?$/, m=>`Результаты не найдены.${m[1]?` Не удалось прочитать строк: ${m[2]}`:""}`, m=>`No results found.${m[1]?` Unreadable lines: ${m[2]}`:""}`],
[/^Qo'shimcha mashq \((\d+) ta savol\)$/, m=>`Дополнительная практика (${m[1]} вопросов)`, m=>`Extra practice (${m[1]} questions)`],
[/^(To'g'ri!|Noto'g'ri\.) To'g'ri javob: ([A-D])\.$/, m=>`${m[1]==="To'g'ri!"?"Верно!":"Неверно."} Правильный ответ: ${m[2]}.`, m=>`${m[1]==="To'g'ri!"?"Correct!":"Incorrect."} Correct answer: ${m[2]}.`],
[/^To'g'ri javob: ([A-D])\.$/, m=>`Правильный ответ: ${m[1]}.`, m=>`Correct answer: ${m[1]}.`],
[/^Noto'g'ri\.$/, ()=>"Неверно.", ()=>"Incorrect."],
[/^60 soniya · Rekord: (\d+)$/, m=>`60 секунд · Рекорд: ${m[1]}`, m=>`60 seconds · Record: ${m[1]}`],
[/^So'z va tarjimani juftlang · Rekord: (\d+)$/, m=>`Соедините слово и перевод · Рекорд: ${m[1]}`, m=>`Match words with translations · Record: ${m[1]}`],
[/^Xato qilsangiz jon kamayadi · Rekord: (\d+)$/, m=>`За ошибку теряете жизнь · Рекорд: ${m[1]}`, m=>`Each mistake costs a life · Record: ${m[1]}`],
[/^Rekord: (\d+)$/, m=>`Рекорд: ${m[1]}`, m=>`Record: ${m[1]}`],
[/^(.+) · (\d+) savol · (\d+) daqiqa$/, m=>`${m[1]} · ${m[2]} вопросов · ${m[3]} минут`, m=>`${m[1]} · ${m[2]} questions · ${m[3]} minutes`],
[/^(.+) · (\d+) savol · vaqtsiz$/, m=>`${m[1]} · ${m[2]} вопросов · без времени`, m=>`${m[1]} · ${m[2]} questions · untimed`],
[/^Savol (\d+) \/ (\d+) ▾$/, m=>`Вопрос ${m[1]} / ${m[2]} ▾`, m=>`Question ${m[1]} / ${m[2]} ▾`],
[/^(Section \d+, Module \d+) — Ko'rib chiqish$/, m=>`${m[1]} — Обзор`, m=>`${m[1]} — Review`],
[/^\((qiyinroq|osonroq|standart) variant\)$/, m=>`(${({qiyinroq:"сложный",osonroq:"лёгкий",standart:"стандартный"})[m[1]]} вариант)`, m=>`(${({qiyinroq:"harder",osonroq:"easier",standart:"standard"})[m[1]]} version)`],
[/^\/ (\d+) \((\d+)%\) · Javobsiz: (\d+) · Vaqt: (\d+) daq (\d+) s$/, m=>`/ ${m[1]} (${m[2]}%) · Без ответа: ${m[3]} · Время: ${m[4]} мин ${m[5]} с`, m=>`/ ${m[1]} (${m[2]}%) · Unanswered: ${m[3]} · Time: ${m[4]} min ${m[5]} s`],
[/^(.+) ← sizning javobingiz$/, m=>`${m[1]} ← ваш ответ`, m=>`${m[1]} ← your answer`],
[/^Talaffuz: (.+)$/, m=>`Произношение: ${m[1]}`, m=>`Pronunciation: ${m[1]}`],
[/^Saqlab bo'lmadi \((.+)\)\. Qayta urinib ko'ring\.$/, m=>`Не удалось сохранить (${m[1]}). Попробуйте ещё раз.`, m=>`Could not save (${m[1]}). Please try again.`],
[/^✅ Tekshirildi: to'g'ri javob$/, ()=>"✅ Проверено: правильный ответ", ()=>"✅ Verified: the correct answer is"],
[/^\) — kitob kaliti bilan mos\.$/, ()=>") — совпадает с ключом книги.", ()=>") — matches the book's answer key."],
[/^\) — kitobdagi javoblar kaliti ([A-D])\) xato edi, tuzatildi\.$/, m=>`) — в ключе книги был ответ ${m[1]}), это исправлено.`, m=>`) — the book's key said ${m[1]}), which was corrected.`],
];

/* ---------- engine ---------- */
const MAPS={ru:new Map(),en:new Map()};
D.forEach(([u,r,e])=>{MAPS.ru.set(u,r);MAPS.en.set(u,e)});
let LANG="uz";
try{const s=localStorage.getItem(KEY);if(LANGS.includes(s))LANG=s}catch(e){}

function tr(s,lang){
  lang=lang||LANG;
  if(lang==="uz"||s==null)return s;
  const k=String(s).replace(/\s+/g," ").trim();
  if(!k||!/[A-Za-z']/.test(k))return s;
  let v=MAPS[lang].get(k);
  if(v==null){for(const p of P){const m=k.match(p[0]);if(m){v=(lang==="ru"?p[1]:p[2])(m,x=>tr(x,lang),lang);break}}}
  if(v==null)return s;
  const lead=/^\s/.test(s)&&!/^[.,;:]/.test(v)?" ":"",trail=/\s$/.test(s)?" ":"";
  return lead+v+trail;
}

const SKIP=".pass,.word,.rtc,.vbt td,.vl span,.psr span,.w,.no-i18n,textarea,script,style,code";
const ATTRS=["placeholder","title","aria-label","alt"];
const orig=new WeakMap(),shown=new WeakMap(),aorig=new WeakMap();

function doText(n){
  const p=n.parentElement;if(!p||p.closest(SKIP))return;
  let o=orig.get(n);
  if(o===undefined||n.data!==shown.get(n)){o=n.data;orig.set(n,o)}
  const v=LANG==="uz"?o:(p.id==="cr"&&o==="Xato"?(LANG==="ru"?"Ошибка":"Error"):tr(o));
  if(n.data!==v)n.data=v;
  shown.set(n,v);
}
function doAttrs(el){
  if(el.closest(SKIP))return;
  let rec=aorig.get(el);if(!rec){rec={};aorig.set(el,rec)}
  for(const a of ATTRS){
    if(!el.hasAttribute(a))continue;
    const cur=el.getAttribute(a),r=rec[a];
    if(!r||cur!==r.shown)rec[a]={o:cur};
    const v=LANG==="uz"?rec[a].o:tr(rec[a].o);
    rec[a].shown=v;if(cur!==v)el.setAttribute(a,v);
  }
}
function walk(root){
  if(!root)return;
  if(root.nodeType===3){doText(root);return}
  if(root.nodeType!==1)return;
  if(root.matches&&root.matches("script,style"))return;
  doAttrs(root);
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
  while(tw.nextNode()){const n=tw.currentNode;if(n.nodeType===3)doText(n);else doAttrs(n)}
}
let busy=false;
const mo=new MutationObserver(list=>{
  if(busy)return;busy=true;
  try{
    for(const m of list){
      if(m.type==="childList")m.addedNodes.forEach(walk);
      else if(m.type==="characterData"){if(m.target.data!==shown.get(m.target))doText(m.target)}
      else if(m.type==="attributes")doAttrs(m.target);
    }
  }finally{busy=false}
});

function applyShell(){
  document.documentElement.lang=LANG;
  document.querySelectorAll("[data-lang]").forEach(b=>{const on=b.dataset.lang===LANG;b.setAttribute("aria-pressed",on);b.classList.toggle("on",on)});
}
function setLang(l){
  if(!LANGS.includes(l))return;
  LANG=l;try{localStorage.setItem(KEY,l)}catch(e){}
  applyShell();
  busy=true;try{walk(document.body)}finally{busy=false}
  document.dispatchEvent(new CustomEvent("ss:lang",{detail:l}));
}
function start(){
  applyShell();
  walk(document.body);
  mo.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS});
}
window.SSI18N={tr:s=>tr(s),setLang,get lang(){return LANG},start};
})();
