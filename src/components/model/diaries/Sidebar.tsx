type TypeProps = {
	current?: string
}
import { SelectArchive } from "@/components/model/diaries/SelectArchive";
// import { ListArchive } from "@/components/model/diaries/ListArchive";
export const Sidebar = ({current}: TypeProps) => {
	return (
		<aside>
			<p className='inline-block gradation-text text-2xl font-medium leading-tight font-code tracking-none'>Archive</p>
			<div className="mt-4">
				{
					<SelectArchive current={current} />
				}
			</div>
		</aside>
	);
}
