import { ChallengeData } from '../types/challenge';

export const challengeData: ChallengeData = {
  "challenges": [
    {
      "id": "reducing-verbosity",
      "title": "Reducing Verbosity",
      "description": "Replace excessive use of loops featuring multiple temporary variables with functional patterns.",
      "defaultLanguage": "python",
      "defaultCode": "numbers = [1, 2, 3, 4, 5]\n# Using list comprehension\neven_squares = [n * n for n in numbers if n % 2 == 0]\n# Or using map and filter\neven_squares = list(map(lambda n: n * n, filter(lambda n: n % 2 == 0, numbers)))",
      "initialCode": `numbers = [1, 2, 3, 4, 5]
even_squares = []
for n in numbers:
    if n % 2 == 0:
        square = n * n
        even_squares.append(square)`
    },
    {
      "id": "eliminating-duplication",
      "title": "Eliminating Duplication",
      "description": "Encapsulate repetitive code in reusable functions, use parameterization to handle specific variations.",
      "defaultLanguage": "python",
      "defaultCode": "def process_data(client):\n    print(f\"Processing data for client {client}\")\n    # ... specific processing for the client ...\n    print(f\"Saving results for client {client}\")\n\nclients = [\"A\", \"B\", \"C\"]\nfor client in clients:\n    process_data(client)",
      "initialCode": `# Repetitive code without functions
print("Processing data for client A")
# ... specific processing for client A ...
print("Saving results for client A")

print("Processing data for client B")
# ... specific processing for client B ...
print("Saving results for client B")

print("Processing data for client C")
# ... specific processing for client C ...
print("Saving results for client C")`
    },
    {
      "id": "managing-complexity",
      "title": "Managing Complexity",
      "description": "Encapsulate data and associated behaviors in classes to model real-world entities for better clarity.",
      "defaultLanguage": "python",
      "defaultCode": "class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\n    def display(self):\n        print(f\"{self.name} costs ${self.price}\")\n\n    def apply_discount(self, discount):\n        self.price -= discount\n\n# Creating an instance of the Product class\nproduct = Product(\"Product X\", 100)\nproduct.display()\nproduct.apply_discount(10)\nproduct.display()",
      "initialCode": `# Global variables for a product
product_name = "Product X"
product_price = 100

def display_product():
    print(f"{product_name} costs ${product_price}")

def apply_discount(discount):
    global product_price
    product_price -= discount

# Using the functions and global variables
display_product()
apply_discount(10)
display_product()`
    },
    {
      "id": "uncluttering-methods",
      "title": "Uncluttering Methods",
      "description": "Handle cross-cutting functionalities like exception handling with decorators.",
      "defaultLanguage": "python",
      "defaultCode": "def generic_decorator(func):\n    def wrapper(*args, **kwargs):\n        print(\"Start of the function\")\n        try:\n            result = func(*args, **kwargs)\n            return result\n        except Exception as e:\n            print(f\"Error in function: {e}\")\n    return wrapper",
      "initialCode": `def function():
    print("Start of the function")
    try:
        # ... main code of the function ...
        pass
    except Exception as e:
        print(f"Error in function: {e}")

def another_function():
    print("Start of the function")
    try:
        # ... main code of another function ...
        pass
    except Exception as e:
        print(f"Error in another_function: {e}")

# Calling the functions
function()
another_function()`
    },
    {
      "id": "optimizing-data-flow",
      "title": "Optimizing Data Flow",
      "description": "Improve code efficiency with iterators and generators.",
      "defaultLanguage": "python",
      "defaultCode": "def read_lines(filename):\n    with open(filename, \"r\") as f:\n        for line in f:\n            yield line\n\nfor line in read_lines(\"large_data.txt\"):\n    # Processing each line\n    pass",
      "initialCode": `# Loading all lines of a file into memory
with open("large_data.txt", "r") as file:
    lines = file.readlines()

for line in lines:
    # Processing each line
    pass`
    }
  ],
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    totalChallenges: 5,
  },
}; 