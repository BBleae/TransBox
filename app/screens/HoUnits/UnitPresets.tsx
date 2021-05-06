import { observer } from 'mobx-react-lite';
import React from 'react';
import { Vibration } from 'react-native';

import DraggableList from '../../components/DraggableList';
import { useStore } from '../../stores';
import { comMolIndex } from '../../stores/ho_units/data';
import { Text, View } from '../../ui-lib';

function UnitPresets() {
  const R = useStore();

  const emptyMessage = (
    <View centerV flexG>
      <View flexS>
        <Text center text65M grey30>点击按钮保存预设{'\n'}左滑移除&emsp;长按拖动排序</Text>
      </View>
    </View>
  );

  return (
    <>
      <Text text70M style={{ color: '#607d8b' }}>可爱的预设们~</Text>
      <DraggableList
        data={R.unit.presets}
        keyExtractor={(o: any) => o.s + o.t + o.m}
        emptyMessage={emptyMessage}
        onPress={i => { Vibration.vibrate(10); R.unit.loadPreset(i); }}
        onSort={data => { R.unit.sortPreset(data); R.unit.save(); }}
        onDelete={i => { R.unit.removePreset(i); R.unit.save(); }}
        title={o =>
          `${o.s} -> ${o.t}` + (!o.m ? '' : (comMolIndex.has(o.m) ? `  @${o.m.replace('*', '')}` : `  @ ${o.m} g/mol`))
        }
      />
    </>
  );
}

export default observer(UnitPresets);
