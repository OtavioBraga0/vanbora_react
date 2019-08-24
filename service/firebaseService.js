import {firebaseDatabase} from '../utils/firebase'

export default class FirebaseService{
    static getDataList = (nodePath, callback, size = 10) => {

        let query = firebaseDatabase.ref(nodePath).limitToLast(size);
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });

        return query;
    };

    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = ref.key;
        ref.set(objToSubmit);
        return id;
    };

    static remove = (id, node) => {
        return firebaseDatabase.ref(node + '/' + id).remove();
    };

    static getData = (nodePath, callback, key) => {

        let query = firebaseDatabase.ref(nodePath);
        query.orderByKey()
        query.equalTo(key)
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });
        return query;
    };
}