import Component from "@/core/component";

interface IComponent {
  instance: Component;
  id: number;
}

class Components {
  items: IComponent[];

  constructor() {
    this.items = [];
  }

  push(component: IComponent) {
    this.items.push(component);
  }

  find(id: number): IComponent | undefined {
    return this.items.find(component => component.id === id);
  }
}

export default Components;
