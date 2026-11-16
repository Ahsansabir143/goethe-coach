# 🐻 Bear Eyes — Reading the Market by Eye

Live: https://ahsansabir143.github.io/goethe-coach/bear-eyes/

A practice app for the Bear Eyes strategy from the guide *Reading the Market by Eye: Engle and O'Hara in practice*. Engle gives the **weather** (how big moves are likely to be), O'Hara gives the **wind** (who is pushing, and which way).

## What's inside

| Page | What you do | Data |
|---|---|---|
| **Today** | Your day of the 12-week (3-month) plan, today's drill counts, reading | — |
| **Learn** | The guide, part by part | — |
| **Examples** | 12 guided situations (chart, order book, trades, Bitcoin) with full explanations | drawn to teach one pattern each |
| **Replay** | Drill 10: a random real past moment. Call LONG / SHORT / WAIT, then the real next 15 minutes play out and are scored | **real** Binance 1-minute candles, taker delta, trades, Bitcoin 15-minute |
| **Drills** | Drills 1, 2, 3, 6, 7, 8, 9 on real past data, each scored against its goal | **real** Binance history |
| **Live** | Drills 4 (wall watch) and 5 (spread alarm) on the live order book | **live** Binance order book |
| **Progress** | Win rate vs no-edge rate, average R after fees, longs vs shorts, discipline, eye calibration, drill scores, expert level, backup, CSV journal | your results |
| **💬 Coach** | Ask about the strategy or "why?" about what's on screen. Optional: add a Claude API key in ⚙️ for free-form answers | built-in knowledge |

## Real data
- Candles, trades and Bitcoin come from Binance's public market-data endpoints (futures first, then the spot mirrors), straight from your browser. No account or key needed.
- Binance does not publish the full past order book. The workflow `.github/workflows/depth-bank.yml` downloads Binance's public `bookDepth` archive every day and stores the real ±1% order-book imbalance per minute in `data/depth/`. Replay shows it when it exists for that minute.

## Scoring (Replay)
Entry = close at NOW. Stop = 1.5 × the last-10 average candle height (at least 0.15%). Target = 2 × stop (at least 0.40%). Round-trip fees 0.10%. If stop and target fall in the same candle, the stop counts. No-edge rate = stop ÷ (stop + target).

**Expert** = all five: 300+ replays · win rate at least 8 points above no-edge · average R ≥ +0.10 after fees · ≥ 80% of trades agreed with the checklist · 8 of 10 drills at goal.

Progress is stored in the browser; use Progress → Export / Import to move between Mac and iPhone.

Educational practice tool. Not financial advice. Practise in Binance Demo Trading first.
