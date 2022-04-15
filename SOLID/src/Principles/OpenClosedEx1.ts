interface IDamaging {
  damage(enemy: LivingForms): void;
}

class LivingForms {
  public get health(): number {
    return this._health;
  }

  constructor(private _health: number) {}

  public getDamage(damage: number): void {
    this._health -= damage;
  }
}

abstract class Weapon implements IDamaging {
  _type: string;
  _damage: number;
  _range: number;

  constructor(type: string, damage: number, range: number) {
    this._type = type;
    this._damage = damage;
    this._range = range;
  }

  damage(enemy: LivingForms) {
    enemy.getDamage(this._damage);
  }

  abstract attack(enemy: LivingForms): void;
}

class Character extends LivingForms {
  private static _DEFAULT_HEALTH: number = 200;

  name: string;
  weapon: Weapon;

  constructor(name: string, weapon: Weapon) {
    super(Character._DEFAULT_HEALTH);
    this.name = name;
    this.weapon = weapon;
  }

  changeWeapon(weapon: Weapon) {
    this.weapon = weapon;
  }
}

class Sword extends Weapon {
  attack(enemy: LivingForms) {
    console.log(`Здоровье врага = ${enemy.health}`);

    this.damage(enemy);

    console.log(`Удар мечом на ${this._damage} урона`);
    console.log(`Здоровье врага = ${enemy.health}\n`);
  }
}

class Crossbow extends Weapon {
  attack(enemy: LivingForms) {
    console.log(`Здоровье врага = ${enemy.health}`);

    this.damage(enemy);

    console.log(`Выстрел из арбалета на ${this._damage} урона`);
    console.log(`Здоровье врага = ${enemy.health}\n`);
  }
}

export default function (): void {
  const Weapons: Weapon[] = [];

  Weapons.push(new Sword("wood_sword", 8, 2));
  Weapons.push(new Sword("stone_sword", 13, 2));
  Weapons.push(new Sword("silver_sword", 17, 3));
  Weapons.push(new Crossbow("rare_crossbow", 19, 20));

  const generatedWeapons = (Weapons: Weapon[]): Weapon => {
    return Weapons[Math.floor(Math.random() * Weapons.length - 0.001)];
  };

  const character = new Character("Warrior", generatedWeapons(Weapons));
  const enemy = new LivingForms(600);

  character.weapon.attack(enemy);

  character.changeWeapon(generatedWeapons(Weapons));

  character.weapon.attack(enemy);
}
