# 🧉 fierrodiario

> Generador diario de estrofas de *El Gaucho Martín Fierro* de José Hernández.

Cada día, una estrofa distinta del poema gauchesco más emblemático de la
literatura argentina. Sin backend. Sin dependecias, HTML + CSS + JS vanilla. 

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
totalmente estática, no requiere servidor, base de datos ni API. De esta forma
el proyecto se puede desplegar en cualquier hosting.

## Créditos

- Texto: José Hernández, *El Gaucho Martín Fierro* – dominio público.
- Algoritmo Mulberry32 tomado del blog de [Nikos Papadopoulos](https://www.4rknova.com/blog/2026/03/01/mulberry32-rng).

## Licencia

- **Código:** [GNU GPLv3](LICENSE)
- **Texto de las estrofas:** dominio público (José Hernández, 1872).  La
  transcripción se libera bajo [CC0 1.0](LICENSE-CONTENT).

---

<p align="center">🇦🇷 Hecho en Argentina 🇦🇷</p>
