class Node {
    constructor(){
        this.value = null;
        this.nextNode = null;
    }
}

class LinkedList {
    #head = null;
    #tail = null;


    append(value){
        const node = new Node()
        node.value = value;
        
        if(this.head() === undefined){
            this.#head = node;
            this.#tail = node;
        }else if(this.head().nextNode === null){
            this.#head.nextNode = node;
            this.#tail.nextNode = node;
            this.#tail = node;
        }else{
            this.#tail.nextNode = node;
            this.#tail = node;
        }

    }

    prepend(value){
        const node = new Node();
        node.value = value;

        if(this.head() === undefined){
            this.#head = node;
            this.#tail = node;
        }else{
            const previousHead = this.#head;
            this.#head = node;
            this.#head.nextNode = previousHead;      
        }

        
    }

    

    head(){
        if(this.#head === null){
            return undefined;
        }

        return this.#head;
    }

    tail(){
        if(this.#tail === null){
            return undefined;
        }

        return this.#tail
    }

    size(){
        if(!this.head()){
            return 0;
        }else{
            let node = this.head();
            let size = 0;

            while(node !== null){
                size++    
                node = node.nextNode;
            }

            return size;
        }
    }

    at(requestedIndex){
        let index = 0;
        let node = this.head();
        while(node){
            if(index === requestedIndex){
                return node;
            }
            node = node.nextNode;
            index++    
        }

        return undefined;
    }

    pop(){
        if(!this.head()){
            return undefined;
        }

        const previousHead = this.head();
        this.#head = previousHead.nextNode;
        return previousHead;
    }

    contains(value){
        let node = this.head();

        while(node){
            if(node.value === value){
                return true;
            }
            node = node.nextNode;
        }

        return false;
    }

    findIndex(value){
        let index = 0;
        let node = this.head();
        while(node){
            index++    
            
            if(node.value === value){
                return index;
            }
            node = node.nextNode;
        }

        return -1;
    }

    toString(){
        let string = ''
        let pointer = '->'
        let node = this.head();
        
        while(node){

            string = string.concat(`(${JSON.stringify(node.value)}) ${pointer} `)

            if(node.nextNode === null){
                return `${string}null`;
            }
            node = node.nextNode;
        }

        return '';
    }

    insertAt(index, ...values){
        const valuesArr = values;
        let node = this.head();
        let i = 0;
        
        while(node){   
            i++
            if(i === index){
                const nextNode = node.nextNode;
                
                for(let i = 0; i < valuesArr.length; i++){
                    const newNode = new Node()
                    newNode.value = valuesArr[i];
                    

                    node.nextNode = newNode;

                    newNode.nextNode = nextNode;
                    node = newNode;
                }

                return
            }

            node = node.nextNode;
        }

        throw new RangeError()
    }

    removeAt(index){
        let previousNode;
        let node = this.head()
        let i = 0;
        while(node){
            i++
            if(index === i){
                if(node === this.head()){
                    this.#head = node.nextNode;
                }else if(node === this.tail()){
                    previousNode.nextNode = null;
                }

                previousNode.nextNode = node.nextNode;
                
                return
            }


            previousNode = node;
            node = node.nextNode;
        }

        throw new RangeError()
    }
}





const list = new LinkedList();

