def pal(s: str):
    d = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    stack = []
    for el in s:
        if el in d:
            if stack and stack[-1] == d[el]:
                stack.pop()
            else:   
                return False
        else:
            stack.append(el)
    return True

assert pal('()') == True
assert pal('()[]{}') == True
assert pal('(]') == False
assert pal('([)]') == False
assert pal('{[]}') == True
