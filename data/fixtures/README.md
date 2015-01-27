Fixtures
========

# Load Fixtures

When loading fixtures  all JSON files (*.json) in this directory is imported to the same collection as the filename (test.json -> test collection).
The collection will be dropped prior to importing it.

# File format

Due to the way mongoimport works the fixture file document per line.
