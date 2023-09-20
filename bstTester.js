import { Node } from "./Node.js";
import { Tree } from "./Tree.js";

function runTest () {

    function randomArr () {
        const arr = []
    
        for(let i = 0; i < 10; i++) {
            arr.push(Math.floor(Math.random() * (100 + 1)))
        }

        return arr

    }
    function unbalancer (tree) {
        for(let i = 0; i < 10; i++) {
            tree.insert(tree.root,(Math.floor(Math.random() * (200 + 1))))

        }
        return tree
    }
    let exampleTree = new Tree(randomArr())
    
    console.log(`Tree is balanced : ${exampleTree.isBalanced()}.`)
    console.log(`Elements in level order - before unbalancing: ${exampleTree.levelOrder()}`)
    console.log(`Elements in pre-order - before unbalancing: ${exampleTree.preorder()}`)
    console.log(`Elements in post-order - before unbalancing: ${exampleTree.postorder()}`)
    unbalancer(exampleTree)
    console.log(`Tree is balanced - before rebalancing: ${exampleTree.isBalanced()}`)
    exampleTree.rebalance()
    console.log(`Tree is balanced - after rebalancing: ${exampleTree.isBalanced()}`)
    console.log(`Elements in level order - post-balancing: ${exampleTree.levelOrder()}`)
    console.log(`Elements in pre-order - post-balancing: ${exampleTree.preorder()}`)
    console.log(`Elements in post-order - post-balancing: ${exampleTree.postorder()}`)
}

runTest()
