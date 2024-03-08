import { UniqueEntityId } from "@core/value-objects/unique-entity-id";

export abstract class Entity<Props> {
	private _id: UniqueEntityId;
	protected props: Props;

	get id() {
		return this._id;
	}

	protected constructor(props: Props, id?: UniqueEntityId) {
		this.props = props;
		this._id = id ?? new UniqueEntityId();
	}

	public equals(entity: Entity<unknown>) {
		if (entity === this) {
			return true;
		}

		if (entity.id.toString() === this.id.toString()) {
			return true;
		}

		return false;
	}
}
