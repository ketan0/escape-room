#!/usr/bin/env python3

# Define a function to convert letters to numbers (A=1, B=2, ..., Z=26) and add all the numbers
def text_to_number_sum(text):
    total = 0
    for char in text.upper():  # Convert to uppercase for consistent mapping
        if char.isalpha():      # Only convert alphabetic characters
            total += ord(char) - ord('A') + 1
        elif char.isdigit():     # Add numbers directly
            total += int(char)
    return total

# Define the strings
strings = [
    "CATS CRADLE 13",
    "ILLUMINATE",
    "GHOSTADMIN",
    "SPECIMENS",
    "SET US FREE"
]

# Calculate the total sum
total_sum = sum(text_to_number_sum(text) for text in strings)
print(total_sum)
