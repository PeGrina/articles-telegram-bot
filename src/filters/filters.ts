import { Filter } from "./filter.type";
import * as fs from "fs/promises";

export class Filters {
  private filters: Filter[] = [];
  private path: string = "";

  constructor(pth: string) {
    this.path = pth;
  }

  async data(): Promise<Filter[]> {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(this.path, { encoding: "utf-8" }).then((json) => {
          resolve(JSON.parse(json));
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async save(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const saveData = JSON.stringify(this.filters, null, 2);
        fs.writeFile(this.path, saveData, { encoding: "utf-8" }).then(() => {
          resolve(true);
        });
      } catch (e) {
        reject(false);
      }
    });
  }

  async create(filter: Filter): Promise<void> {
    await this.filters.push(filter);
    await this.save();
  }
}
