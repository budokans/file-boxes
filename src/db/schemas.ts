export interface FileBoxRow {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly storage_file_name: string;
  readonly created_at: string;
  readonly updated_at: string | null;
  readonly deleted_at: string | null;
}
