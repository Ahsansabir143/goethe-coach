#!/usr/bin/env python3
"""Add ?v=<timestamp> to every local script in class/index.html so browsers load the newest files after each push."""
import re, time, pathlib
p = pathlib.Path(__file__).resolve().parent.parent / 'class' / 'index.html'
v = time.strftime('%Y%m%d%H%M%S')
s = p.read_text()
s = re.sub(r'<script src="((?!https?:)[^"?]+)(\?v=\d+)?"></script>', lambda m: f'<script src="{m.group(1)}?v={v}"></script>', s)
p.write_text(s)
print('version', v)
