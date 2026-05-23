'use client'
import { MainStudioModel } from "@/components/MainStudioModel";
import { View } from "@react-three/drei";

export default function Home() {
  return (
    <>
    <View className="w-full h-dvh">
      <MainStudioModel/>
    </View>
    </>
  );
}
