import os

with open('test_write.txt', 'w', encoding='utf-8') as f:
    f.write('Testing here-string write\n')

print('Test passed!')
