import { ChallengeData } from '../types/challenge';

export const challengeData: ChallengeData = {
  "challenges": [
    {
      "id": "reducing-verbosity",
      "title": "Reducing Verbosity",
      "description": "Replace excessive use of loops featuring multiple temporary variables with functional patterns.",
      "defaultLanguage": "python",
      "defaultCode": "numbers = [1, 2, 3, 4, 5]\n# Using list comprehension\neven_squares = [n * n for n in numbers if n % 2 == 0]\n# Or using map and filter\neven_squares = list(map(lambda n: n * n, filter(lambda n: n % 2 == 0, numbers)))"
    },
    {
      "id": "eliminating-duplication",
      "title": "Eliminating Duplication",
      "description": "Encapsulate repetitive code in reusable functions, use parameterization to handle specific variations.",
      "defaultLanguage": "python",
      "defaultCode": "def process_data(client):\n    print(f\"Processing data for client {client}\")\n    # ... specific processing for the client ...\n    print(f\"Saving results for client {client}\")\n\nclients = [\"A\", \"B\", \"C\"]\nfor client in clients:\n    process_data(client)"
    },
    {
      "id": "managing-complexity",
      "title": "Managing Complexity",
      "description": "Encapsulate data and associated behaviors in classes to model real-world entities for better clarity.",
      "defaultLanguage": "python",
      "defaultCode": "class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\n    def display(self):\n        print(f\"{self.name} costs ${self.price}\")\n\n    def apply_discount(self, discount):\n        self.price -= discount\n\n# Creating an instance of the Product class\nproduct = Product(\"Product X\", 100)\nproduct.display()\nproduct.apply_discount(10)\nproduct.display()"
    },
    {
      "id": "uncluttering-methods",
      "title": "Uncluttering Methods",
      "description": "Handle cross-cutting functionalities like exception handling with decorators.",
      "defaultLanguage": "python",
      "defaultCode": "def generic_decorator(func):\n    def wrapper(*args, **kwargs):\n        print(\"Start of the function\")\n        try:\n            result = func(*args, **kwargs)\n            return result\n        except Exception as e:\n            print(f\"Error in function: {e}\")\n    return wrapper\n\n@generic_decorator\ndef function():\n    # ... main code of the function ...\n    pass\n\n@generic_decorator\ndef another_function():\n    # ... main code of another function ...\n    pass\n\n# Calling the decorated functions\nfunction()\nanother_function()"
    },
    {
      "id": "optimizing-data-flow",
      "title": "Optimizing Data Flow",
      "description": "Improve code efficiency with iterators and generators.",
      "defaultLanguage": "python",
      "defaultCode": "def read_lines(filename):\n    with open(filename, \"r\") as f:\n        for line in f:\n            yield line\n\nfor line in read_lines(\"large_data.txt\"):\n    # Processing each line\n    pass"
    }
  ],
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    totalChallenges: 5,
  },
}; 