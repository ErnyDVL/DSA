class HashMap {
    #currentLoad = 0;
    #buckets;

    constructor(capacity, loadFactor){
        this.capacity = capacity || 16;
        this.loadFactor = loadFactor || 0.75;
        this.#createHashMap(capacity);
    }

    #createHashMap(capacity){
        this.#buckets = Array(capacity)
        this.#currentLoad = 0;

    }

    
    #checkLoad(){
        if(this.#currentLoad > Math.floor(this.capacity * this.loadFactor)){
            const oldMapkv = this.entries();
            

            this.capacity = this.capacity * 2;
            this.#createHashMap(this.capacity)
        
            oldMapkv.forEach((kv) =>{
                this.set(kv[0], kv[1])
            })

        }
    }
    

    hash(key){
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    bucket(key){
        const hash = this.hash(key);

        if(!this.#buckets[hash]){
            this.#buckets[hash] = []
        }

        return this.#buckets[hash];
    }

    set(key, value){
        const bucket = this.bucket(key);

        for(let i = 0; i < bucket.length; i++){
            if(bucket[i][0] === key){
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.#currentLoad++;
        this.#checkLoad()
    }

    get(key){
        const bucket = this.bucket(key);

        for(let i = 0; i < bucket.length; i++){
            if(key === bucket[i][0]){
                return bucket[i][1]
            }
        }

        return null;
    }

    has(key){
        const bucket = this.bucket(key)

        for(let i = 0; i < bucket.length; i++){
            if(key === bucket[i][0]){
                return true;
            }
        }

        return false;
    }

    remove(key){
        const bucket = this.bucket(key)

        for(let i = 0; i < bucket.length; i++){
            if(key === bucket[i][0]){
                bucket.splice(i, 1)
            
                if(bucket.length < 1){
                    this.#buckets[this.hash(key)] = undefined;
                }

                this.#currentLoad--;

                return true;
            }
        }

        return false;
    }

    entries(){
        const arr = []
        for(let i = 0; i < this.capacity; i++){
            if(this.#buckets[i]){
                for(let x = 0; x < this.#buckets[i].length; x++){
                    arr.push(this.#buckets[i][x])
                }
            }

        }

        return arr;
    }

    length(){
        return this.#currentLoad;
    }

    clear(){
        this.#createHashMap(this.capacity);
    }

    keys(){
        let kv = this.entries();
        let keysArr = []

        kv.forEach((arr) =>{
            keysArr.push(arr[0]);
        })

        return keysArr;
    }

    values(){
        let kv = this.entries();
        let valuesArr = []

        kv.forEach((arr) =>{
            valuesArr.push(arr[1]);
        })

        return valuesArr;
    }
}


