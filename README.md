# مشروع المحفظة الاحترافية (Portfolio)

هذا المشروع عبارة عن موقع محفظة شخصية (Portfolio) احترافي مبني باستخدام Python و Flask. يمكن استخدامه لعرض مهاراتك ومشاريعك وتوفير وسيلة للتواصل معك.

## المميزات

- تصميم متجاوب يعمل على جميع الأجهزة
- دعم كامل للغة العربية (RTL)
- صفحة رئيسية جذابة
- صفحة "من أنا" لعرض معلوماتك الشخصية والمهنية
- صفحة مشاريع مع إمكانية التصفية
- نموذج اتصال
- تأثيرات حركية جميلة

## المتطلبات

- Python 3.6+
- Flask

## التثبيت والتشغيل

1. قم بإنشاء بيئة افتراضية (Virtual Environment):

```bash
python -m venv venv
```

2. تفعيل البيئة الافتراضية:

- في نظام Windows:
```bash
venv\Scripts\activate
```

- في نظام Linux/Mac:
```bash
source venv/bin/activate
```

3. تثبيت المكتبات المطلوبة:

```bash
pip install -r requirements.txt
```

4. تشغيل التطبيق:

```bash
python app.py
```

5. افتح المتصفح وانتقل إلى العنوان التالي:

```
http://127.0.0.1:5000/
```

## التخصيص

يمكنك تخصيص المحتوى من خلال:

1. تعديل النصوص في ملفات القوالب في مجلد `templates`
2. تحديث المشاريع في ملف `app.py`
3. تخصيص الألوان والأنماط في ملف `static/css/style.css`
4. إضافة صورك الخاصة في مجلد `static/img`

## الترخيص

هذا المشروع متاح تحت رخصة MIT. يمكنك استخدامه وتعديله بحرية لأغراضك الشخصية أو التجارية.