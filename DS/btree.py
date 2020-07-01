class Node:
    def __init__(self, data):
        self.left = None
        self.right = None
        self.data = data

    def insert(self, data):
        if self.data:
            if data < self.data:
                if self.left is None:
                    self.left = Node(data)
                else:
                    self.left.insert(data)
            elif data > self.data:
                if self.right is None:
                    self.right = Node(data)
                else:
                    self.right.insert(data)
        else:
            self.data = data
            
    def inOrder(self):
        if self.left:
            self.left.inOrder()
        print( self.data),
        if self.right:
            self.right.inOrder()
            
num = int(input("Enter total nodes "))

for i in range(0,num):
    val = int(input("Enter value "))
    if i == 0:
        root = Node(val)
    else:
        root.insert(val)
    if i==num-1:
        root.inOrder()