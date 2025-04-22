import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

type GameEngineProps = {
  children: React.ReactNode;
  onUpdate?: (deltaTime: number) => void;
  running?: boolean;
};

const GameEngine = ({ children, onUpdate, running = true }: GameEngineProps) => {
  const lastUpdateTime = useRef(Date.now());
  const frameId = useRef<number | null>(null);

  const gameLoop = () => {
    const now = Date.now();
    const deltaTime = (now - lastUpdateTime.current) / 1000;
    lastUpdateTime.current = now;

    if (running && onUpdate) {
      onUpdate(deltaTime);
    }

    frameId.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (running) {
      lastUpdateTime.current = Date.now();
      frameId.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [running]);

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GameEngine;