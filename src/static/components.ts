import Component from "@/core/component";

interface IComponent {
  instance: Component;
  id: string;
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

  remove(id: string) {
    const items = this.items.filter(item => item.id.includes(id));

    console.log(Object.assign([], this.items))

    for (var i = 0; i < items.length; i++) {
      const index = this.items.indexOf(items[i]) 
      this.items.splice(index, 1);
    }

    console.log(Object.assign([], this.items))
  }
}

export default Components;