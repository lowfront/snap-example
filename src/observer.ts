export class Observer<T> {
  update(messages: T) {
    throw '!';
  }
}

export class Subject<T> {
  subscribers: Set<Observer<T>> = new Set;
  subscribe(subscriber: Observer<T>) {
    this.subscribers.add(subscriber);
  }
  unsubscribe(subscriber: Observer<T>) {
    this.subscribers.delete(subscriber);
  }
  notify(messages: T) {
    this.subscribers.forEach(subscriber => subscriber.update(messages));
  }
}