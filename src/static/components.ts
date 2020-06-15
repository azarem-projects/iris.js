import Component from "@/core/component";

interface IComponent {
  instance: Component;
  id: string;
  key: string;
  parent: {
    _id: string;
    key: string;
  }
}

class Components {
  items: IComponent[];

  constructor() {
    this.items = [];
  }

  push(component: IComponent) {
    this.items.push(component);
  }

  find(predicate: (value: IComponent, index: number, obj: IComponent[]) => unknown): IComponent | undefined {
    return this.items.find(predicate);
  }

  remove(predicate: (value: IComponent, index: number, obj: IComponent[]) => unknown) {    
    const index = this.items.findIndex(predicate);
    
    this.items.splice(index, 1);
  }

  getUnique(id: string | number): Component | undefined {
    return this.items.find(component => component.instance.id === id)?.instance;
  }
}

export default Components;
