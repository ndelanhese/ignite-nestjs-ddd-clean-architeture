import { Entity } from "@core/entities/entity";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { AttachmentProps } from "./attachment.types";

export class Attachment extends Entity<AttachmentProps> {
	get title() {
		return this.props.title;
	}

	get link() {
		return this.props.link;
	}

	static create(props: AttachmentProps, id?: UniqueEntityId) {
		return new Attachment(props, id);
	}
}
