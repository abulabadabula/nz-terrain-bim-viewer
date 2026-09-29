import { Provider } from 'react-redux';
import { store } from './app/store';
import Scene from './components/Scene';
import SearchPanel from './features/ui/SearchPanel';
import InfoPanel from './features/ui/InfoPanel';

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen w-screen flex bg-gray-900 text-white">
        {/* 左侧 3D 场景 */}
        <div className="flex-1 relative">
          <Scene />
          {/* 搜索面板悬浮在左上角 */}
          <div className="absolute top-4 left-4 z-10">
            <SearchPanel />
          </div>
        </div>
        {/* 右侧信息面板 */}
        <div className="w-80 flex-shrink-0">
          <InfoPanel />
        </div>
      </div>
    </Provider>
  );
}

export default App;