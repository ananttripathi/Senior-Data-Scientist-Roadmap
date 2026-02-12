# Python Cheatsheet for Data Science

Quick reference for common Python operations.

---

## Data Structures

```python
# List
lst = [1, 2, 3]
lst.append(4)
lst.extend([5, 6])
lst.pop()

# Dict
d = {'a': 1, 'b': 2}
d.get('c', 0)  # default if missing
d.keys(), d.values(), d.items()

# Set (unique elements)
s = {1, 2, 3}
s.add(4)
s.remove(1)

# Tuple (immutable)
t = (1, 2, 3)
```

---

## List Comprehensions

```python
# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(10) if x % 2 == 0]

# Nested
matrix = [[i*j for j in range(3)] for i in range(3)]

# Dict comprehension
{x: x**2 for x in range(5)}
```

---

## Functions

```python
def func(a, b=0, *args, **kwargs):
    return a + b

# Lambda
f = lambda x: x**2

# Type hints
def add(a: int, b: int) -> int:
    return a + b
```

---

## Error Handling

```python
try:
    result = risky_operation()
except ValueError as e:
    print(f"Error: {e}")
except Exception as e:
    print(f"Unexpected: {e}")
finally:
    cleanup()
```

---

## File I/O

```python
# Read
with open('file.txt', 'r') as f:
    content = f.read()

# Write
with open('file.txt', 'w') as f:
    f.write('content')

# JSON
import json
data = json.load(open('data.json'))
json.dump(data, open('out.json', 'w'))
```

---

## Virtual Environments

```bash
# Create
python -m venv venv

# Activate (Unix)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install
pip install -r requirements.txt
pip freeze > requirements.txt
```
