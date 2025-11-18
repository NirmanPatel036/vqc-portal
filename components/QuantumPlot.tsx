"use client"

import { useEffect, useRef, useState } from 'react';

interface ScatterPoint {
  x: number;
  y: number;
  label: number;
}

interface DecisionMesh {
  x: number[][];
  y: number[][];
  z: number[][];
}

interface QuantumPlotProps {
  plotData: ScatterPoint[];
  meshData: DecisionMesh | null;
  newPoints: ScatterPoint[];
  onPlotClick: (event: any) => void;
}

const QuantumPlot = ({ plotData, meshData, newPoints, onPlotClick }: QuantumPlotProps) => {
  const plotRef = useRef<HTMLDivElement>(null);
  const plotInstanceRef = useRef<any>(null);
  const [plotly, setPlotly] = useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Debug: Component render
  console.log('QuantumPlot component rendering');
  console.log('Props received:', { 
    plotDataLength: plotData.length, 
    hasMeshData: !!meshData, 
    newPointsLength: newPoints.length 
  });

  // Debug: Log props changes
  console.log('=== QUANTUM PLOT PROPS ===')
  console.log('plotDataLength:', plotData.length)
  console.log('plotData sample:', plotData.slice(0, 3))
  console.log('hasMeshData:', !!meshData)
  console.log('newPointsLength:', newPoints.length)

  useEffect(() => {
    console.log('Loading Plotly...');
    const loadPlotly = async () => {
      try {
        const plotlyModule = await import('plotly.js-dist');
        const PlotlyInstance = plotlyModule.default;
        console.log('Plotly loaded successfully:', !!PlotlyInstance);
        setPlotly(PlotlyInstance);
      } catch (error) {
        console.error('Failed to load Plotly:', error);
      }
    };

    if (!plotly) {
      loadPlotly();
    }
  }, []);

  useEffect(() => {
    console.log('QuantumPlot useEffect triggered');
    console.log('plotData length:', plotData.length);
    console.log('meshData:', meshData ? 'has meshData' : 'no meshData');
    console.log('newPoints length:', newPoints.length);
    console.log('plotly loaded:', !!plotly);
    
    if (!plotly) {
      console.log('Plotly not loaded yet - waiting...');
      return;
    }

    console.log('Calling renderPlot from useEffect');
    renderPlot().catch(error => console.error('Error in renderPlot:', error));
  }, [plotData, meshData, newPoints, plotly]);

  const renderPlot = async () => {
    console.log('QuantumPlot renderPlot called');
    
    if (!plotly || !plotRef.current) {
      console.log('Cannot render: Plotly =', !!plotly, 'plotRef =', !!plotRef.current);
      return;
    }

    // Debug logging
    console.log('plotData:', plotData.length, 'items');
    console.log('meshData:', meshData ? 'has meshData' : 'no meshData');
    console.log('newPoints:', newPoints.length, 'items');

    const traces: any[] = [];

    try {
      // Add training data points FIRST (so they're on top)
      if (plotData.length > 0) {
        console.log('Adding training data points, count:', plotData.length);
        // Group by label
        const class0Points = plotData.filter(p => p.label === 0);
        const class1Points = plotData.filter(p => p.label === 1);
        
        console.log('Class 0 points:', class0Points.length, 'Class 1 points:', class1Points.length);
        
        // Debug: Check the actual data being sent to Plotly
        if (class0Points.length > 0) {
          console.log('Class 0 sample points:', class0Points.slice(0, 3));
          console.log('Class 0 x values:', class0Points.slice(0, 3).map(p => p.x));
          console.log('Class 0 y values:', class0Points.slice(0, 3).map(p => p.y));
        }

        if (class0Points.length > 0) {
          const validClass0 = class0Points.filter(p => 
            typeof p.x === 'number' && typeof p.y === 'number' && 
            !isNaN(p.x) && !isNaN(p.y) && 
            isFinite(p.x) && isFinite(p.y)
          );
          
          if (validClass0.length > 0) {
            traces.push({
              x: validClass0.map(p => p.x),
              y: validClass0.map(p => p.y),
              mode: 'markers',
              type: 'scatter',
              marker: {
                color: '#FF0000',  // Bright red
                size: 15,          // Larger size
                symbol: 'circle',
                line: { color: '#FFFFFF', width: 2 }
              },
              name: 'Class 0',
              showlegend: true
            });
            console.log('Added Class 0 trace with', validClass0.length, 'valid points');
          }
        }

        if (class1Points.length > 0) {
          const validClass1 = class1Points.filter(p => 
            typeof p.x === 'number' && typeof p.y === 'number' && 
            !isNaN(p.x) && !isNaN(p.y) && 
            isFinite(p.x) && isFinite(p.y)
          );
          
          if (validClass1.length > 0) {
            traces.push({
              x: validClass1.map(p => p.x),
              y: validClass1.map(p => p.y),
              mode: 'markers',
              type: 'scatter',
              marker: {
                color: '#0000FF',  // Bright blue
                size: 15,          // Larger size
                symbol: 'circle',
                line: { color: '#FFFFFF', width: 2 }
              },
              name: 'Class 1',
              showlegend: true
            });
            console.log('Added Class 1 trace with', validClass1.length, 'valid points');
          }
        }
      }

      // Add decision boundary mesh AFTER points (so it's in background)
      if (meshData && meshData.x && meshData.y && meshData.z && 
          Array.isArray(meshData.x) && meshData.x.length > 0 &&
          Array.isArray(meshData.y) && meshData.y.length > 0 &&
          Array.isArray(meshData.z) && meshData.z.length > 0) {
        
        console.log('Mesh data raw structure:', {
          xType: typeof meshData.x,
          yType: typeof meshData.y,
          zType: typeof meshData.z,
          xIsArray: Array.isArray(meshData.x),
          xLength: meshData.x.length,
          x0Type: typeof meshData.x[0],
          x0IsArray: Array.isArray(meshData.x[0])
        });
        
        try {
          // For contour plots, we need the mesh data in the correct format
          // If it's 2D arrays, use them directly for contour
          if (Array.isArray(meshData.x[0]) && Array.isArray(meshData.y[0]) && Array.isArray(meshData.z[0])) {
            // 2D mesh format - use directly for contour
            traces.push({
              z: meshData.z,
              x: meshData.x[0], // First row as x coordinates
              y: meshData.y.map(row => row[0]), // First column as y coordinates
              type: 'contour',
              showscale: false,
              colorscale: [
                [0, 'rgba(255, 100, 100, 0.3)'],
                [1, 'rgba(100, 100, 255, 0.3)']
              ],
              contours: {
                coloring: 'fill',
                showlabels: false,
                showlines: false
              },
              name: 'Decision Boundary',
              showlegend: false
            });
            console.log('Added 2D mesh data trace');
          } else {
            console.log('Mesh data not in expected 2D format, skipping');
          }
        } catch (meshError) {
          console.error('Error processing mesh data:', meshError);
        }
      } else {
        console.log('Skipping mesh data - invalid or empty structure');
      }
    } catch (error) {
      console.error('Error creating traces:', error);
      return;
    }

    // Add newly classified points
    if (newPoints.length > 0) {
      const validNewPoints = newPoints.filter(p => 
        typeof p.x === 'number' && typeof p.y === 'number' && 
        !isNaN(p.x) && !isNaN(p.y) && 
        isFinite(p.x) && isFinite(p.y)
      );
      
      const newClass0 = validNewPoints.filter(p => p.label === 0);
      const newClass1 = validNewPoints.filter(p => p.label === 1);

      if (newClass0.length > 0) {
        traces.push({
          x: newClass0.map(p => p.x),
          y: newClass0.map(p => p.y),
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: 'red',
            size: 12,
            symbol: 'x',
            line: { color: 'white', width: 2 }
          },
          name: 'New Class 0'
        });
      }

      if (newClass1.length > 0) {
        traces.push({
          x: newClass1.map(p => p.x),
          y: newClass1.map(p => p.y),
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: 'blue',
            size: 12,
            symbol: 'x',
            line: { color: 'white', width: 2 }
          },
          name: 'New Class 1'
        });
      }
    }

    // Calculate optimal axis ranges to show all data with padding
    let xMin = 0, xMax = 1, yMin = 0, yMax = 1;
    
    if (plotData.length > 0) {
      const allX = plotData.map(p => p.x);
      const allY = plotData.map(p => p.y);
      
      xMin = Math.min(...allX);
      xMax = Math.max(...allX);
      yMin = Math.min(...allY);
      yMax = Math.max(...allY);
      
      // Add 10% padding on each side
      const xPadding = (xMax - xMin) * 0.1;
      const yPadding = (yMax - yMin) * 0.1;
      
      xMin = Math.max(0, xMin - xPadding);
      xMax = Math.min(1, xMax + xPadding);
      yMin = Math.max(0, yMin - yPadding);
      yMax = Math.min(1, yMax + yPadding);
    }

    const layout = {
      title: {
        text: 'Classifier Plot',
        font: { color: '#FDE047' }
      },
      xaxis: {
        title: 'Feature 1',
        range: [xMin, xMax],
        gridcolor: '#374151',
        zerolinecolor: '#374151',
        tickfont: { color: '#D1D5DB' },
        titlefont: { color: '#D1D5DB' },
        linewidth: 2,
        mirror: true
      },
      yaxis: {
        title: 'Feature 2',
        range: [yMin, yMax],
        gridcolor: '#374151',
        zerolinecolor: '#374151',
        tickfont: { color: '#D1D5DB' },
        titlefont: { color: '#D1D5DB' },
        linewidth: 2,
        mirror: true
      },
      paper_bgcolor: 'black',
      plot_bgcolor: 'black',
      font: { color: '#D1D5DB' },
      legend: {
        font: { color: '#D1D5DB' },
        bgcolor: 'rgba(0,0,0,0.5)'
      },
      margin: { t: 50, r: 50, b: 50, l: 50 },
      shapes: [{
        type: 'rect',
        xref: 'paper',
        yref: 'paper',
        x0: 0,
        y0: 0,
        x1: 1,
        y1: 1,
        line: {
          color: '#FDE047',
          width: 2,
          dash: 'dash'
        },
        fillcolor: 'rgba(0,0,0,0)'
      }]
    };    const config = {
      responsive: true,
      displayModeBar: false
    };

    console.log('About to plot with traces:', traces.length, 'traces');
    console.log('Traces preview:', traces.map(t => ({ type: t.type, name: t.name, dataLength: t.x?.length || 'N/A' })));
    
    // Debug: Log each trace in detail
    traces.forEach((trace, index) => {
      console.log(`Trace ${index}:`, {
        name: trace.name,
        type: trace.type,
        mode: trace.mode,
        xLength: trace.x?.length,
        yLength: trace.y?.length,
        firstX: trace.x?.[0],
        firstY: trace.y?.[0],
        marker: trace.marker
      });
    });

    try {
      console.log('Final traces count:', traces.length);
      console.log('Final traces structure:', traces.map(t => ({
        type: t.type,
        name: t.name,
        hasX: !!t.x,
        hasY: !!t.y,
        hasZ: !!t.z,
        xLength: t.x?.length || 0,
        yLength: t.y?.length || 0
      })));

      // Ensure we have valid traces
      const validTraces = traces.filter(t => {
        if (t.type === 'scatter') {
          return t.x && t.y && Array.isArray(t.x) && Array.isArray(t.y) && t.x.length > 0 && t.y.length > 0;
        } else if (t.type === 'contour') {
          return t.z && Array.isArray(t.z) && t.z.length > 0;
        }
        return false;
      });

      if (validTraces.length === 0) {
        console.warn('No valid traces found, creating minimal display');
        validTraces.push({
          x: [0.5],
          y: [0.5],
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: '#FFFF00',
            size: 15,
            symbol: 'circle'
          },
          name: 'No Data'
        });
      }

      console.log('Using', validTraces.length, 'valid traces for plotting');
      
      await plotly.newPlot(plotRef.current, validTraces, layout, config);
      if (plotRef.current) {
        // Store the plot instance for event handling
        plotInstanceRef.current = plotRef.current;
        // Add click event listener
        (plotRef.current as any).on('plotly_click', onPlotClick);
      }
      console.log('Plot created successfully');
    } catch (error) {
      console.error('Error creating Plotly plot:', error);
      // Fallback: create a minimal scatter plot
      try {
        const fallbackTrace = [{
          x: [0.3, 0.5, 0.7],
          y: [0.3, 0.5, 0.7],
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: '#FF0000',
            size: 10,
            symbol: 'circle'
          },
          name: 'Fallback Data'
        }];
        
        console.log('Trying fallback plot...');
        await plotly.newPlot(plotRef.current, fallbackTrace, layout, config);
        console.log('Fallback plot successful');
      } catch (fallbackError) {
        console.error('Fallback plot also failed:', fallbackError);
        // Last resort: create empty div with error message
        if (plotRef.current) {
          plotRef.current.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; color: #FDE047; border: 2px dashed #FDE047; border-radius: 8px;">
              <div style="text-align: center;">
                <div style="font-size: 24px; margin-bottom: 8px;">⚠️</div>
                <div>Plot Error</div>
                <div style="font-size: 12px; margin-top: 4px;">Check console for details</div>
              </div>
            </div>
          `;
        }
      }
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!plotRef.current || !plotly) return;

    try {
      const currentLayout = (plotRef.current as any).layout;
      if (!currentLayout || !currentLayout.xaxis || !currentLayout.yaxis) {
        console.warn('Layout not ready for zoom');
        return;
      }

      const xRange = currentLayout.xaxis.range;
      const yRange = currentLayout.yaxis.range;

      if (!xRange || !yRange || xRange.length !== 2 || yRange.length !== 2) {
        console.warn('Invalid axis ranges');
        return;
      }

      // Calculate current center and span
      const xCenter = (xRange[0] + xRange[1]) / 2;
      const yCenter = (yRange[0] + yRange[1]) / 2;
      const xSpan = xRange[1] - xRange[0];
      const ySpan = yRange[1] - yRange[0];

      // Apply zoom factor (smaller factor for smoother zooming)
      const zoomFactor = direction === 'in' ? 0.8 : 1.25;
      const newXSpan = xSpan * zoomFactor;
      const newYSpan = ySpan * zoomFactor;

      // Calculate new ranges centered on the current center
      const newXRange = [
        Math.max(0, xCenter - newXSpan / 2),
        Math.min(1, xCenter + newXSpan / 2)
      ];
      const newYRange = [
        Math.max(0, yCenter - newYSpan / 2),
        Math.min(1, yCenter + newYSpan / 2)
      ];

      // Apply the new ranges
      plotly.relayout(plotRef.current, {
        'xaxis.range': newXRange,
        'yaxis.range': newYRange,
      });
    } catch (error) {
      console.error('Error in handleZoom:', error);
    }
  };

  return (
    <div className="relative w-full h-96 md:h-[550px]" style={{ minHeight: '400px' }}>
      <div ref={plotRef} className="w-full h-full" />
      <div className="absolute -bottom-1 -right-1 flex gap-2">
        <button
          onClick={() => handleZoom('in')}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-yellow-400/30 rounded-full text-yellow-400 text-2xl flex items-center justify-center hover:bg-yellow-400/20 transition"
        >
          +
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-yellow-400/30 rounded-full text-yellow-400 text-2xl flex items-center justify-center hover:bg-yellow-400/20 transition"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default QuantumPlot;