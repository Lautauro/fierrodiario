# 🧉 fierrodiario

> Generador diario de estrofas de *El Gaucho Martín Fierro* de José Hernández.

Cada día una estrofa distinta del poema gauchesco más emblemático de la
literatura argentina. Sin backend. Sin dependencias, HTML + CSS + JS vanilla.

---

## ¿Cómo funciona?

1. **Algoritmo determinista:** Se toma el año actual como semilla en el
   generador de números pseudoaleatorios (PRNG) [Mulberry32](https://www.4rknova.com/blog/2026/03/01/mulberry32-rng).
2. **Barajado tipo mazo:** El listado completo de estrofas se permuta al estilo
   [Fisher-Yates](https://es.wikipedia.org/wiki/Algoritmo_de_Fisher-Yates), es
   decir, como si se barajara un mazo de cartas.
3. **Estrofa del día:** Se indexa el día del año (1–365/366) sobre el mazo ya
   barajado, garantizando una estrofa única por día sin repeticiones.

Todo el proceso se ejecuta **íntegramente en el navegador**. Al ser una web
totalmente estática se monta en un simple servidor HTTP sin configuración
adicional. De esta forma el proyecto se puede desplegar en cualquier hosting.

## Créditos

- **Texto de las estrofas:** José Hernández, *El Gaucho Martín Fierro* – dominio
  público.
- Algoritmo Mulberry32 tomado del blog de [Nikos Papadopoulos](https://www.4rknova.com/blog/2026/03/01/mulberry32-rng).

## Licencia

- **Código:** [GNU GPLv3](LICENSE).
- **El Gaucho Martín Fierro:** dominio público (José Hernández, 1872). La
  transcripción se libera bajo [CC BY-SA 4.0](LICENSE-CONTENT). Puede
  encontrarla en Wikisource como ["El Gaucho Martín Fierro (1894)"](https://es.wikisource.org/wiki/El_Gaucho_Mart%C3%ADn_Fierro_(1894).

---

<p align="center">🇦🇷 Hecho en Argentina 🇦🇷</p>
