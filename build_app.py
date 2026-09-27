# Build script for Coal-Vault AI
import os, json

SRC_DIR = os.path.join(os.getcwd(), 'src')
DATA_DIR = os.path.join(SRC_DIR, 'data')
COMP_DIR = os.path.join(SRC_DIR, 'components')
UTIL_DIR = os.path.join(SRC_DIR, 'utils')

for d in [SRC_DIR, DATA_DIR, COMP_DIR, UTIL_DIR]:
    os.makedirs(d, exist_ok=True)

print('Directories ready!')
