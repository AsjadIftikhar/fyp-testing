import re


def exprice(price_string):
    price_string = str(price_string)
    price_str = price_string.replace(",", "")
    price = re.search(r"\d+\.\d+", price_str)
    if not price:
        price = re.search(r"\d+", price_str)

    return price.group(0) if price else 0


def clean_string():
    pass


# For Unit  Testing / Sample Runs
if __name__ == "__main__":
    s = "adskba pkr2500/-sadasd"
    print(exprice(s))
    print(type(exprice(s)))