#!/usr/bin/env python3
"""Build the real order-book lean archive used by Replay.

Downloads Binance's public USDⓈ-M futures "bookDepth" daily files from data.binance.vision
(resting order depth within ±1..5% of price, sampled through the day) and stores, for every
minute, the ±1% imbalance = (bid depth − ask depth) / (bid depth + ask depth) × 100.

Output: data/depth/{SYMBOL}-{YYYY-MM}.json  →  {"band": "±1%", "days": {"07": [1440 values or null]}}
Runs in GitHub Actions (see .github/workflows/depth-bank.yml); safe to re-run, skips days already stored.
"""
import csv, io, json, os, sys, urllib.request, zipfile
from datetime import date, timedelta, datetime

SYMBOLS = os.environ.get("SYMBOLS", "ETHUSDT,SOLUSDT,BTCUSDT,BNBUSDT,XRPUSDT,DOGEUSDT").split(",")
DAYS = int(os.environ.get("DAYS", "100"))
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "depth")
URL = "https://data.binance.vision/data/futures/um/daily/bookDepth/{s}/{s}-bookDepth-{d}.zip"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "bear-eyes-depth-bank"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def day_series(raw):
    z = zipfile.ZipFile(io.BytesIO(raw))
    text = z.read(z.namelist()[0]).decode()
    snaps = {}
    for row in csv.reader(io.StringIO(text)):
        if not row or not row[0][:1].isdigit():
            continue  # header
        ts, pct, depth = row[0], float(row[1]), float(row[2])
        snaps.setdefault(ts, {})[pct] = depth
    out = [None] * 1440
    for ts, d in sorted(snaps.items()):
        b, a = d.get(-1.0), d.get(1.0)
        if not b or not a:
            continue
        t = datetime.strptime(ts[:19], "%Y-%m-%d %H:%M:%S")
        out[t.hour * 60 + t.minute] = round((b - a) / (b + a) * 100)
    return out


def main():
    os.makedirs(OUT, exist_ok=True)
    end = date.today() - timedelta(days=1)
    changed = 0
    for sym in SYMBOLS:
        files = {}
        for i in range(DAYS):
            d = end - timedelta(days=i)
            key = f"{sym}-{d:%Y-%m}"
            if key not in files:
                p = os.path.join(OUT, key + ".json")
                files[key] = json.load(open(p)) if os.path.exists(p) else {"band": "±1%", "days": {}}
            f = files[key]
            dd = f"{d.day:02d}"
            if dd in f["days"]:
                continue
            try:
                f["days"][dd] = day_series(fetch(URL.format(s=sym, d=d.isoformat())))
                changed += 1
                print("ok", sym, d)
            except Exception as e:  # file not published yet or missing
                print("skip", sym, d, e)
        for key, f in files.items():
            if f["days"]:
                with open(os.path.join(OUT, key + ".json"), "w") as fh:
                    json.dump(f, fh, separators=(",", ":"))
    print("days added:", changed)


if __name__ == "__main__":
    sys.exit(main())
