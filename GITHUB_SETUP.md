# GitHub Setup Instructions

## Push to GitHub

Якщо виникла помилка автентифікації, виконайте один з наступних варіантів:

### Варіант 1: Використання SSH (рекомендовано)

1. Перевірте, чи є у вас SSH ключ:
```bash
ls -al ~/.ssh
```

2. Якщо немає, створіть новий:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

3. Додайте ключ до GitHub:
```bash
cat ~/.ssh/id_ed25519.pub
# Скопіюйте вивід і додайте на https://github.com/settings/keys
```

4. Змініть remote на SSH:
```bash
git remote set-url origin git@github.com:west-dp/boilerplate-ui-kit.git
git push -u origin main
```

### Варіант 2: Використання Personal Access Token

1. Створіть токен на GitHub:
   - Перейдіть на https://github.com/settings/tokens
   - Натисніть "Generate new token (classic)"
   - Виберіть права: `repo`
   - Скопіюйте токен

2. Використайте токен при push:
```bash
git push https://YOUR_TOKEN@github.com/west-dp/boilerplate-ui-kit.git main
```

Або налаштуйте credential helper:
```bash
git config --global credential.helper store
# При наступному push введіть username і токен як password
```

### Варіант 3: GitHub CLI

```bash
# Встановіть GitHub CLI (якщо ще не встановлено)
brew install gh

# Авторизуйтеся
gh auth login

# Push
git push -u origin main
```

## Після успішного push

Після того, як код буде завантажено на GitHub, інші проекти зможуть встановити бібліотеку:

```bash
yarn add https://github.com/west-dp/boilerplate-ui-kit.git
```

Або вказати конкретну гілку/тег:
```bash
yarn add https://github.com/west-dp/boilerplate-ui-kit.git#main
```

