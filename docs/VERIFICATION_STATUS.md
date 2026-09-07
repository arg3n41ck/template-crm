# Проверки перед выпуском — 2026-09-07

Версия: **v0.3.0**. Ниже — локальные проверки перед публикацией; итог HTTPS/CI см. в релизном отчёте hub.

- `pnpm install --frozen-lockfile --ignore-scripts`, `pnpm verify`: PASS после security-обновлений.
- Production dependency audit: 0 advisories.
- Full dependency audit: 0 advisories после миграции dev-toolchain.
- Manifest/portable adapters/common kit и release-preflight: PASS.
- Генерация из актуального локального Git snapshot: PASS; пустой HOME, каталог с пробелами, exact provenance, no origin, standalone AI-check. Новая публичная HTTPS release не проверена.
- Browser главного экрана: 1440/390 px, без runtime pageerror и overflow.
- Удалены vendor tailwind-merge, example routes и устаревший readme/. Старые example URL безопасно показывают Not Found. Dockerfile исправлен, но Docker build не проверен. Остальные legacy URL-хелперы не мигрировались.

Ограничения: live API/БД, cross-model benchmark, новые remote CI/deploy и distribution rights не доказаны этими локальными проверками. Лицензии не менялись. Общий релизный отчёт хранится в hub `docs/community-release.md`; прежние результаты не заменяют свежие проверки после следующей правки.

## Dev-toolchain — завершено

- Storybook 10.6.0 и актуальные docs/links addons; obsolete пакеты 7/8 удалены.
- Vitest/UI/coverage 4.1.11, Happy DOM 20.14.0; @types/react и @types/react-dom соответствуют React 18.
- Frozen-lockfile install, полный audit, peers check, pnpm verify, coverage и сборка Storybook: PASS.
- Browser: CRM desktop/mobile, manager Storybook и обе stories открываются без pageerror. Проверен фактический Tailwind-стиль аватара; исправлены alias и source scan для preview.
- Покрытие statements — 2.3%: это три существующих regression-теста, не полное покрытие CRM. Новых бизнес-тестов задача миграции не обещает.
- Storybook сообщает предупреждения о размере служебного bundle и игнорировании use client; сборка/рендер проходят. Статус remote CI проверяется отдельно при публикации.
