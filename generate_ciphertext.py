#!/usr/bin/env python3

import random
import string

def generate_cipher():
    # Get the alphabet
    alphabet = list(string.ascii_lowercase)
    # Shuffle the alphabet
    random.shuffle(alphabet)
    # Join it back into a string
    return ''.join(alphabet)

def encode_text(plain_text, cipher_alphabet):
    # Define the standard alphabet
    alphabet = string.ascii_lowercase
    # Create a dictionary mapping from standard alphabet to cipher alphabet
    cipher_dict = {alphabet[i]: cipher_alphabet[i] for i in range(26)}
    # Encode each character in the plain text
    encoded_text = ''.join(cipher_dict.get(char, char) for char in plain_text.lower())
    return encoded_text

# Generate a cipher alphabet
cipher_alphabet = generate_cipher()
print("Cipher Alphabet:", cipher_alphabet)
cipher_alphabet = 'wnedopvthqfakbrlszxyimjugc'

# Example usage
plain_texts = ["jackolantern", "spiderweb", "skull", "witch", "broom", "illuminate"]
for plain_text in plain_texts:
    print("Plain Text:", plain_text)
    encoded_text = encode_text(plain_text, cipher_alphabet)
    print("Encoded Text:", encoded_text)
    print()
