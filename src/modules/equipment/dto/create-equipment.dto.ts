export class CreateEquipmentDto {
  name: string;
  parentId: number;
  price: number;
  total: number;
  available: number;
  createId: string;
}

export class RepairDto {
  id: number;
  damage: number;
}
