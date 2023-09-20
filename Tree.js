
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

      levelOrder(root = this.root, visitor = null) {
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
      inorder(root, visitor = null) {
        if (root === null) {
          return []
        }
        
        // apply the visitor function if provided
        if (visitor !== null) {
          visitor(root)
        } 
        
        // traverse the left subtree
        let leftValues = this.inorder(root.left, visitor)
        // traverse the right subtree
        let rightValues = this.inorder(root.right, visitor)
        return [...leftValues, root.value, ...rightValues]
      }

      preorder(root = this.root, visitor = null) {
        if(root === null) {
          return []
        }


        const leftValues = this.preorder(root.left, visitor) 
        const rightValues = this.preorder(root.right, visitor)

        return [root.value, ...leftValues, ...rightValues]
      }

      postorder(root = this.root, visitor = null) {
        if (root === null) {
          return []
        }

        const leftValues = this.postorder(root.left, visitor)
        const rightValues = this.postorder(root.right, visitor)

        return [...leftValues, ...rightValues, root.value]
      }

      height (root) {
        // height is 0 if the tree is empty - base case
        if (root === null) {
          return -1;
        }

        let heightLeft = this.height(root.left)
        let heightRight = this.height(root.right)

        if(heightLeft > heightRight) {
          return heightLeft + 1
        } else {
          return heightRight + 1
        }
      }

      depth (node, root = this.root, depth = 0)  {
      if (!node) {
        return null;
      }
       if (root === null) { 
        return 0
       }

       if (root.value === node.value) { 
        return depth
       }
        
       let count = this.depth(node, root.left, depth + 1)

       if(count !== 0) {
        return count
       }

       return this.depth(node, root.right, depth + 1)
      }

      isBalanced(root = this.root) {
        if (root === null) {
          return false;
        }

        let leftHeight = this.height(root.left)
        let rightHeight = this.height(root.right)


        if(Math.abs(leftHeight - rightHeight) < 2) {
          return true
        } else {
          return false
        }
      }

      rebalance() {
        let nodes = this.inorder(this.root)
        this.root = this.buildTree(nodes)
      }


      // this is a helper method used by the 'delete' method
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




let visitor = (n) => {
  console.log(n.value)
}





let testValue1 = new Node(11)
let testValue2 = new Node(8)
let testValue3 = new Node(2)
let testValue4 = new Node(4)
// console.log(test.height(test.root))
// console.log('-------------------')
// console.log(test.depth(testValue1))
// console.log(test.depth(testValue2))
// console.log(test.depth(testValue3))
// console.log(test.depth(testValue4))
// console.log(test.isBalanced(test.root))
// prettyPrint(test.root)
// test.insert(test.root, 23)
// test.insert(test.root, 16)
// test.insert(test.root, 31)
// test.insert(test.root, 29)
// test.insert(test.root, 77)
// test.insert(test.root, 71)
// test.insert(test.root, 25)
// test.insert(test.root, 77)
// test.insert(test.root, 99)
// test.insert(test.root, 90)
// prettyPrint(test.root)
// console.log(test.isBalanced(test.root))
// test.rebalance(test)
// console.log(test.isBalanced(test.root))
// // prettyPrint(test.root)
console.log(test.levelOrder())
console.log(test.preorder())