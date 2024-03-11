import { AggregateRoot } from "@core/entities/aggregate-root";
import { Optional } from "@core/types/optional";
import { UniqueEntityId } from "@core/value-objects/unique-entity-id";
import { QuestionAttachmentList } from "@forum-entities/question-attachment-list";
import { Slug } from "@forum-value-objects/slug";
import { QuestionProps } from "./question.types";
import { QuestionBestQuestionChosenEvent } from "@forum-events/question-best-answer-chosen-event";
import dayjs from "dayjs";

export class Question extends AggregateRoot<QuestionProps> {
	static create(
		props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
		id?: UniqueEntityId,
	) {
		const question = new Question(
			{
				...props,
				slug: props.slug ?? Slug.createFromText(props.title),
				attachments: props.attachments ?? new QuestionAttachmentList(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);

		return question;
	}

	get authorId() {
		return this.props.authorId;
	}

	get bestAnswerId() {
		return this.props.bestAnswerId;
	}

	get title() {
		return this.props.title;
	}

	get content() {
		return this.props.content;
	}

	get slug() {
		return this.props.slug;
	}

	get attachments() {
		return this.props.attachments;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get isNew(): boolean {
		return dayjs().diff(this.createdAt, "days") <= 3;
	}

	get except() {
		return this.content.substring(0, 120).trim().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	set attachments(attachments: QuestionAttachmentList) {
		this.props.attachments = attachments;
		this.touch();
	}

	set title(title: string) {
		this.props.title = title;
		this.props.slug = Slug.createFromText(title);
		this.touch();
	}

	set bestAnswerId(bestAnswerId: UniqueEntityId | undefined | null) {
		if (!bestAnswerId) return;

		if (
			!this.props.bestAnswerId ||
			!this.props.bestAnswerId.equals(bestAnswerId)
		) {
			this.addDomainEvent(
				new QuestionBestQuestionChosenEvent(this, bestAnswerId),
			);
		}

		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}
}
