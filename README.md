# LumexAI
**LumexAI** — инструмент для генерации текста с помощью маленького ии, подходящий для интеграции с [ForgeScript](https://github.com/tryforge/ForgeScript).

## Установка
Для установки используйте следующую команду:

```bash
npm i https://github.com/pealse-studio/LumexAI.git
```

## Подключение
После установки подключите **LumexAI** к своему клиенту **ForgeScript** следующим образом:

```js
const { ForgeClient } = require("@tryforge/forgescript");
const { LumexAI } = require("@pealse-studio/lumex-ai");

const client = new ForgeClient({
    extensions: [
        new LumexAI()
    ]
});

client.login("token");
```

### Замечания
Технология, используемая для генерации текста с помощью ИИ, не гарантирует точные ответы на ваши вопросы.
