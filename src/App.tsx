// src/App.tsx
import { Provider } from 'react-redux';
import { store } from './app/store';
import Scene from './components/Scene';
import SearchPanel from './features/ui/SearchPanel';
import InfoPanel from './features/ui/InfoPanel';

function App() {
  return (
    <Provider store={store}>
      {/* 主容器：全屏 flex 布局 */}
      <div className="h-screen w-screen flex bg-gray-900 text-white overflow-hidden">
        
        {/* 左侧控制面板：固定宽度，包含搜索和信息 */}
        <div className="w-80 flex-shrink-0 flex flex-col border-r border-gray-800 bg-gray-900 z-10">
          
          {/* 顶部：地址搜索栏 */}
          <div className="p-4 border-b border-gray-800">
            <SearchPanel />
          </div>
          
          {/* 下部：几何信息面板 (占据剩余空间并支持内部滚动) */}
          <div className="flex-1 overflow-y-auto">
            <InfoPanel />
          </div>
          
        </div>

        {/* 右侧：3D 场景 Canvas (占据所有剩余空间) */}
        <div className="flex-1 relative bg-gray-950">
          <Scene />
        </div>
        
      </div>
    </Provider>
  );
}

export default App;