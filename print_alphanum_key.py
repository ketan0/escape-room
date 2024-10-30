#!/usr/bin/env python3

# Generate a plaintext key for letters A-Z and numbers 0-9

# Create key dictionary for letters and numbers
letter_key = {chr(i): i - ord('A') + 1 for i in range(ord('A'), ord('Z') + 1)}
number_key = {str(i): i for i in range(10)}

# Combine letter and number keys into one formatted string
plaintext_key = (" " * 4).join([f"{k} => {v}" for k, v in {**letter_key, **number_key}.items()])
print(plaintext_key)
