"use client";

import type {
  SizeOption,
  GlobalOptions,
  CheckCategoryId,
} from "@/types/menuTypes";
import SizeOptionSelector from "./SizeOptionSelector";
import IceOptionSelector from "./IceOptionSelector";
import SugarOptionSelector from "./SugarOptionSelector";
import CoffeeOptionSelector from "./CoffeeOptionSelector";
import MilkOptionSelector from "./MilkOptionSelector";

type Props = {
  categoryId: CheckCategoryId;

  sizes: SizeOption[];
  sizesId: SizeOption["id"];
  onSizeChange: (id: SizeOption["id"]) => void;

  ices: GlobalOptions[];
  icesId: GlobalOptions["id"];
  onIceChange: (id: GlobalOptions["id"]) => void;

  sugar: GlobalOptions[];
  sugarId: GlobalOptions["id"];
  onSugarChange: (id: GlobalOptions["id"]) => void;

  coffee: GlobalOptions[];
  coffeeId: GlobalOptions["id"];
  onCoffeeChange: (id: GlobalOptions["id"]) => void;

  milk: GlobalOptions[];
  milkId: GlobalOptions["id"];
  onMilkChange: (id: GlobalOptions["id"]) => void;
};

export default function OptionsPanel({
  categoryId,
  sizes,
  sizesId,
  onSizeChange,
  ices,
  icesId,
  onIceChange,
  sugar,
  sugarId,
  onSugarChange,
  coffee,
  coffeeId,
  onCoffeeChange,
  milk,
  milkId,
  onMilkChange,
}: Props) {
  const isIcedCoffee = categoryId === "iced-coffee";
  const isIcedTea = categoryId === "iced-tea";
  const showMilk = !isIcedTea;
  return (
    <div>
      <div>
        <SizeOptionSelector
          sizesOpt={sizes}
          value={sizesId}
          onChange={onSizeChange}
        />
      </div>

      <div>
        <IceOptionSelector
          iceOpt={ices}
          value={icesId}
          onChange={onIceChange}
        />
      </div>

      <div>
        <SugarOptionSelector
          sugarOpt={sugar}
          value={sugarId}
          onChange={onSugarChange}
        />
      </div>

      <div>
        {isIcedCoffee && (
          <CoffeeOptionSelector
            coffeeOpt={coffee}
            value={coffeeId}
            onChange={onCoffeeChange}
          />
        )}
      </div>

      <div>
        {showMilk && (
          <MilkOptionSelector
            milkOpt={milk}
            value={milkId}
            onChange={onMilkChange}
          />
        )}
      </div>
    </div>
  );
}
