export default interface AssetResponseDto {
  id: number;
  parentAssetId: number | null;
  name: string;
  children: Array<AssetResponseDto> | null;
}
