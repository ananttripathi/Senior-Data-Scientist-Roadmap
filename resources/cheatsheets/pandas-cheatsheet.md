# Pandas Cheatsheet

Quick reference for common Pandas operations.

---

## Reading Data

```python
import pandas as pd

# CSV
df = pd.read_csv('file.csv')
df = pd.read_csv('file.csv', sep=';', encoding='utf-8')

# Excel
df = pd.read_excel('file.xlsx')

# JSON
df = pd.read_json('file.json')
```

---

## Exploration

```python
df.head(), df.tail()
df.shape
df.info()
df.describe()
df.dtypes
df.columns
df.isnull().sum()
```

---

## Selection

```python
# Columns
df['col']
df[['col1', 'col2']]

# Rows
df.loc[0]
df.iloc[0:5]
df[df['col'] > 10]

# Boolean indexing
df[df['col'].isin([1, 2, 3])]
```

---

## Cleaning

```python
# Drop
df.drop(columns=['col'])
df.dropna(axis=0)
df.drop_duplicates()

# Fill
df.fillna(0)
df.fillna(df.mean())

# Rename
df.rename(columns={'old': 'new'})
```

---

## Grouping & Aggregation

```python
df.groupby('col').mean()
df.groupby('col').agg({'a': 'sum', 'b': 'mean'})
df.groupby(['col1', 'col2']).size()
```

---

## Merging

```python
pd.merge(df1, df2, on='key')
pd.merge(df1, df2, left_on='a', right_on='b')
pd.concat([df1, df2], axis=0)
```
