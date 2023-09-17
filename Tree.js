import { Node } from "./Node.js";

export class Tree {
    constructor (data) {
        this.root = this.buildTree(data)
        
    }

    buildTree(data) {
        const sorted = [...new Set(data)].sort((a, b) => a - b)
        
        if(sorted.length === 0) {
            return null;
        }

        let middleIndex = Math.floor(sorted.length / 2)
        let rootElement = sorted[middleIndex]
        
        let centerNode = new Node(rootElement)

        centerNode.left = this.buildTree(sorted.slice(0, middleIndex))
        centerNode.right = this.buildTree(sorted.slice(middleIndex + 1))

       return centerNode
    }
    insert (root = this.root, value) {
      if (root === null) {
        return new Node(value)
      }

        if (value < root.value) {
          root.left = this.insert(root.left, value)
        } else if (value > root.value) { 
          root.right = this.insert(root.right, value)
        }

        return root
      }
      delete (root, value) {
        if (root === null) {
          return null
        }
        
        if(value < root.value) // case 1 - value to delete smaller than the value in root
        { 
          root.left = this.delete(root.left, value)
        } else if (value > root.value) // case 2 - value to delete greater than the value in root
        {
          root.right = this.delete(root.right, value)
        } else // case 3 - value to delete is in the root
        {
          if (root.left === null) {
            return root.right
          } else if (root.right === null) {
            return root.left
          }
          let temp = this.minValueNode(root.right)
          root.value = temp.value
          root.right = this.delete(root.right, temp.value)
        }
        return root
      }

      find (root, value) {
        if(root === null || root.value === value) {
          return root
        }

        if (value < root.value) {
          return this.find(root.left, value)
        } else if (value > root.value) {
          return this.find(root.right, value)
        }

      }

      levelOrder(root, visitor = null) {
        if(root === null) {
          return []
        }

        let queue = []
        let result = []

        // enqueue root node
        queue.push(root)

        while(queue.length !== 0) {
          let node = queue.shift()

          // apply visitor function if provided

          if(visitor) {
            visitor(node)
          }
          result.push(node.value)
          // enqueue left child if it exists
          if (node.left !== null) {
            queue.push(node.left)
          }
          // enqueue right child if it exists
          if (node.right !== null) {
            queue.push(node.right)
          }
        }
        return result
      }

      minValueNode(node) {
        let current = node
        while(current.left) {
          current = current.left
        }
        return current
      }


      
    }
    

    


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const randomArray = [8, 2, 11, 6, 5, 9, 3, 1, 7, 4, 10, 12]
let test = new Tree(randomArray)
console.log(test)
prettyPrint(test.root)
console.log('-------------------')
test.insert(test.root, 31)
prettyPrint(test.root)
console.log('-------------------')
test.delete(test.root, 31)
prettyPrint(test.root)
console.log(test.find(test.root, 11))

let visitor = (n) => {
  console.log(n.value)
}

test.levelOrder(test.root, visitor)